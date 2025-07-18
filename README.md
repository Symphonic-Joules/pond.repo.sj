#🤖 Symphonee Agent Communication Protocol#

Overview

This document defines the agent-to-agent communication contract for the Symphonee orchestration layer. It standardizes how agents exchange structured messages, enabling modular, scalable, and interoperable AI workflows.

Each agent adheres to a shared schema for message passing, with clear definitions for intents, payloads, and context. This allows agents to be composed dynamically and operate in parallel.

🔐 Authentication

All agent communication uses OAuth 2.0 Bearer Tokens.

Authorization: Bearer <access_token>
Content-Type: application/json

🧩 Generic Message Schema

Request

{
  "message_id": "uuid-1234",
  "timestamp": "2025-07-17T13:45:00Z",
  "sender_agent": "ContentIngestionAgent",
  "recipient_agent": "StructBotAgent",
  "intent": "tag_document",
  "payload": { ... },
  "context": { ... }
}

Response

{
  "message_id": "uuid-1234",
  "status": "success",
  "recipient_agent": "StructBotAgent",
  "response_payload": { ... },
  "logs": [ ... ]
}

🧠 Agent Contracts

1. 🏷️ StructBotAgent

Capabilities:

tag_document

code_generation

code_analysis

search_digital_library

🔧 tag_document Intent

Payload Example:

{
  "document_id": "doc-5678",
  "document_text": "Full extracted content here...",
  "metadata": {
    "source": "user_upload",
    "file_type": "pdf",
    "language": "en"
  }
}

Response Payload Example:

{
  "tags": ["AI", "multi-agent systems", "document ingestion"],
  "confidence_scores": {
    "AI": 0.98,
    "multi-agent systems": 0.91,
    "document ingestion": 0.87
  },
  "next_action_suggestion": {
    "agent": "DigitalLibraryAgent",
    "intent": "store_tagged_document",
    "priority": "high"
  }
}

Implementation Note: StructBotAgent wraps calls to its internal FastAPI endpoint:

POST /api/tag_document

The agent receives a Symphonee message, translates it into a REST API call, and returns the result in the standardized response format.

2. 📚 DigitalLibraryAgent (aka LibraryUpdateAgent)

Capabilities:

store_tagged_document

retrieve_document

update_document_metadata

🔧 store_tagged_document Intent

Payload Example:

{
  "document_id": "doc-5678",
  "tags": ["AI", "multi-agent systems"],
  "metadata": {
    "source": "user_upload",
    "file_type": "pdf",
    "language": "en",
    "ingested_by": "ContentIngestionAgent"
  },
  "raw_text": "Full extracted content here..."
}

Response Payload Example:

{
  "status": "stored",
  "mongo_id": "64c8f9e2a1b3",
  "index_status": "indexed",
  "available_for_agents": ["SummarizerAgent", "TutorAgent"]
}

Implementation Note: This agent interfaces with MongoDB and optionally a vector store. It receives tagged documents and persists them for future retrieval and semantic search.

3. 📄 ContentIngestionAgent

Capabilities:

extract_gdoc_content

🔧 extract_gdoc_content Intent

Payload Example:

{
  "gdoc_id": "1A2B3C4D5E",
  "auth_token": "oauth-token",
  "user_id": "user-abc"
}

Response Payload Example:

{
  "document_id": "doc-5678",
  "document_text": "Extracted content from Google Doc...",
  "metadata": {
    "title": "AI Collaboration Proposal",
    "author": "Jaclyn",
    "source": "Google Docs",
    "language": "en"
  },
  "next_action_suggestion": {
    "agent": "StructBotAgent",
    "intent": "tag_document"
  }
}

Implementation Note: This agent uses OAuth 2.0 Desktop App flow to access Google Docs, extract content, and prepare it for tagging and ingestion.

🧪 Error Handling

{
  "status": "error",
  "error_code": "EXTRACTION_FAILED",
  "message": "Google Docs API returned 403 Forbidden."
}

🔍 Agent Registry (Optional Extension)

GET /api/agents

Response:

[
  {
    "agent_name": "StructBotAgent",
    "capabilities": ["tag_document", "code_analysis"]
  },
  {
    "agent_name": "DigitalLibraryAgent",
    "capabilities": ["store_tagged_document", "retrieve_document"]
  }
]

🧭 Best Practices

Use UUIDs for message_id to ensure traceability.

Include next_action_suggestion to enable dynamic chaining.

Maintain context for session continuity and personalization.

Log all agent interactions for audit and debugging.

Agents should be stateless and composable.

Ethical Declarations

Transparency and Accountability

Symphonee agents are designed to operate with full transparency, ensuring that all actions, decisions, and data exchanges are logged and auditable.

Users are empowered to review and understand the rationale behind agent decisions.

Privacy and Security

All user data is handled with the utmost care, adhering to strict privacy standards and encryption protocols.

Agents are programmed to minimize data retention and avoid unnecessary data sharing.

Inclusivity and Fairness

Symphonee agents are built to serve diverse user needs, avoiding biases and promoting equitable access to AI capabilities.

Continuous monitoring and updates ensure that agents remain fair and inclusive.

Sustainability and Efficiency

Symphonee prioritizes energy-efficient algorithms and resource-conscious operations to reduce environmental impact.

Agents are optimized for performance without compromising ethical standards.

Collaboration and Empowerment

Symphonee fosters collaboration between agents and users, enabling seamless workflows and empowering users to achieve their goals.

Agents are designed to complement human expertise, not replace it.

Unique Capabilities

Dynamic Agent Composition

Symphonee enables the seamless orchestration of multiple agents, dynamically composing workflows to address complex tasks.

Context-Aware Interactions

Agents maintain session continuity and adapt to user preferences, ensuring personalized and contextually relevant responses.

Scalable AI Workflows

Symphonee supports modular and scalable workflows, allowing organizations to expand their AI capabilities as needed.

Interoperable Communication

Agents adhere to standardized communication protocols, ensuring compatibility and interoperability across diverse systems.

Proactive Suggestions

Symphonee agents anticipate user needs and provide proactive suggestions to enhance productivity and decision-making.

Robust Error Handling

Agents are equipped with advanced error detection and recovery mechanisms, ensuring reliability and resilience in operations.

Ethical AI Integration

Symphonee integrates ethical considerations into every aspect of its design, from data handling to decision-making processes.

name: Protobuf Lint

on: pull_request: branches: - main # Or your default branch like 'master', 'develop' etc. paths: - '**.proto' # Only run if .proto files are changed

jobs: lint: runs-on: ubuntu-latest

steps:
  - name: Checkout code
    uses: actions/checkout@v4 # Action to checkout your repository code

  - name: Install Buf
    # Download and install the Buf CLI. Adjust version as needed.
    run: |
      curl -sSL 
        "https://github.com/bufbuild/buf/releases/download/v1.27.1/buf-$(uname -s)-$(uname -m)" 
        -o /usr/local/bin/buf
      chmod +x /usr/local/bin/buf
      buf --version # Verify installation

  - name: Run Buf Lint
    # Execute the buf lint command using your buf.yaml configuration.
    # This command will fail the job if any linting errors are found.
    run: buf lint --config buf.yaml
