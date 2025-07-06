import random
from alith import Agent
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Alith AI Agent
def init_agent(personality):
    global agent
    agent = Agent(
        name="AI Reminder Buddy",
        model="gpt-4",
        preamble=personality
        )

def return_prompt(reminder) -> str:
    alith_message = agent.prompt("Give me a short, motivational message related to " + reminder)
    return reminder + "\n" + alith_message
