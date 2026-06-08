#!/usr/bin/env python3
"""Test Feishu DM using hermes-agent's lark SDK"""
import sys
import json
import os

sys.path.insert(0, '/home/ubuntu/.hermes/hermes-agent/venv/lib/python3.11/site-packages')

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

from lark_oapi import Client
from lark_oapi.api.im.v1 import CreateMessageRequest
from lark_oapi.api.im.v1.model import CreateMessageRequestBody

client = Client.builder().app_id(app_id).app_secret(app_secret).build()

# Try sending to chat_id
chat_id = 'oc_5a70e642f7a048e8e629194ce6236a74'
card_content = json.dumps({
    'config': {'wide_screen_mode': True},
    'header': {'title': {'tag': 'plain_text', 'content': 'Test Card'}, 'template': 'purple'},
    'elements': [{'tag': 'div', 'text': 'Test message from SDK'}]
})

req = CreateMessageRequest.builder().receive_id_type("chat_id").build()
req.body = CreateMessageRequestBody.builder().receive_id(chat_id).msg_type("interactive").content(card_content).build()

try:
    resp = client.im.v1.message.create(req)
    print('Status:', resp.code)
    print('Response:', resp.raw)
except Exception as e:
    print('Exception:', type(e).__name__, str(e))
