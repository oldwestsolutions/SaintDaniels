from flask import Flask, request, jsonify
from docusign_esign import ApiClient, EnvelopesApi, EnvelopeDefinition, Document, Signer, SignHere, Tabs
import base64
import os
from datetime import datetime

app = Flask(__name__)

# DocuSign configuration
DOCUSIGN_ACCOUNT_ID = "your_account_id"
DOCUSIGN_INTEGRATION_KEY = "your_integration_key"
DOCUSIGN_USER_ID = "your_user_id"
DOCUSIGN_PRIVATE_KEY = "your_private_key"  # Load this securely in production

# Initialize DocuSign client
def get_docusign_client():
    api_client = ApiClient()
    api_client.set_base_path("https://demo.docusign.net/restapi")  # Use account-d.docusign.net for production
    
    # Configure JWT authentication
    private_key = DOCUSIGN_PRIVATE_KEY
    api_client.configure_jwt_authorization_flow(
        DOCUSIGN_INTEGRATION_KEY,
        DOCUSIGN_USER_ID,
        DOCUSIGN_ACCOUNT_ID,
        private_key,
        3600
    )
    
    return api_client

@app.route('/api/docusign/sign', methods=['POST'])
def create_envelope():
    try:
        data = request.json
        signature = data.get('signature')
        name = data.get('name')
        email = data.get('email')

        # Create the document
        doc_html = f"""
        <html>
            <body>
                <h1>Saint Daniels Healthcare Enrollment Consent</h1>
                <p>I, {name}, hereby consent to enroll in Saint Daniels Healthcare services.</p>
                <p>Signature: {signature}</p>
                <p>Date: {datetime.now().strftime('%Y-%m-%d')}</p>
            </body>
        </html>
        """
        
        # Convert to PDF (you might want to use a HTML to PDF converter here)
        doc_b64 = base64.b64encode(doc_html.encode('utf-8')).decode('utf-8')
        
        # Create envelope definition
        envelope_definition = EnvelopeDefinition(
            email_subject="Please sign your Saint Daniels Healthcare enrollment",
            documents=[
                Document(
                    document_base64=doc_b64,
                    name="Enrollment Consent",
                    file_extension="html",
                    document_id="1"
                )
            ],
            recipients=dict(
                signers=[
                    Signer(
                        email=email,
                        name=name,
                        recipient_id="1",
                        routing_order="1",
                        tabs=Tabs(
                            sign_here_tabs=[
                                SignHere(
                                    document_id="1",
                                    page_number="1",
                                    x_position="100",
                                    y_position="100"
                                )
                            ]
                        )
                    )
                ]
            ),
            status="sent"
        )

        # Get DocuSign client
        api_client = get_docusign_client()
        envelope_api = EnvelopesApi(api_client)
        
        # Create and send envelope
        envelope_summary = envelope_api.create_envelope(
            account_id=DOCUSIGN_ACCOUNT_ID,
            envelope_definition=envelope_definition
        )

        return jsonify({
            "status": "success",
            "envelope_id": envelope_summary.envelope_id
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True) 