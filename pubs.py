import zmq
import json
import time

def main():
    # Initialize ZMQ context
    context = zmq.Context()

    # Create subscriber socket for receiving from Raspberry Pi
    receiver = context.socket(zmq.SUB)
    receiver.bind("tcp://*:5556")  # Bind to port where Raspberry Pi sends
    receiver.setsockopt_string(zmq.SUBSCRIBE, "health_metrics")
    
    # Create publisher socket to send to web.js
    sender = context.socket(zmq.PUB)
    sender.bind("tcp://*:5555")  # Port that web.js is listening on
    
    print("ZMQ Bridge started:")
    print("Receiving on port 5556")
    print("Publishing to port 5555")
    
    try:
        while True:
            try:
                # Receive message from Raspberry Pi
                topic = receiver.recv_string()
                message = receiver.recv_string()
                
                # Parse and enhance the data
                data = json.loads(message)
                data['received_timestamp'] = time.strftime("%H:%M:%S")
                
                # Convert back to JSON string
                enhanced_message = json.dumps(data)
                
                # Forward to web.js
                sender.send_string(topic, zmq.SNDMORE)
                sender.send_string(enhanced_message)
                
                print(f"Forwarded: {enhanced_message}")
                
            except Exception as e:
                print(f"Error processing message: {e}")
                time.sleep(1)  # Prevent tight loop on error
                
    except KeyboardInterrupt:
        print("\nShutting down...")
    finally:
        receiver.close()
        sender.close()
        context.term()

if __name__ == "__main__":
    main()
