#!/usr/bin/env python3
"""Try sending to SolaLab with different approaches"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')

resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'
bot_open_id = 'ou_73242ac0ab7574add81c7f88c70b088f'
huawei_open_id = 'ou_41093a1f19bf33b93aeeae6d4ac942ba'

# Try 1: Text message with chat_id type
r1 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'text', 'content': json.dumps({'text': 'Test'})},
    timeout=15
)
print('Try 1 (chat_id, text):', r1.status_code, r1.text[:200])

# Try 2: Interactive card with chat_id type
card_content = json.dumps({
    'config': {'wide_screen_mode': True},
    'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'},
    'elements': [{'tag': 'div', 'text': 'Hello'}]
})
r2 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': card_content},
    timeout=15
)
print('Try 2 (chat_id, card):', r2.status_code, r2.text[:200])

# Try 3: Send to huawei open_id directly using user_id_type=open_id
r3 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=open_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': huawei_open_id, 'msg_type': 'text', 'content': json.dumps({'text': 'Direct to user'})},
    timeout=15
)
print('Try 3 (open_id, text):', r3.status_code, r3.text[:200])
