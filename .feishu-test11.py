#!/usr/bin/env python3
"""Test Feishu card - try different element types"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'

# Try markdown element instead of div
c1 = json.dumps({'config': {}, 'header': {}, 'elements': [{'tag': 'markdown', 'content': '**Hello**'}]})
r1 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': c1}, timeout=15
)
print('markdown:', r1.status_code, r1.text[:100] if r1.status_code != 200 else 'OK')

# Try with title
c2 = json.dumps({'config': {}, 'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'}, 'elements': [{'tag': 'markdown', 'content': '**Hello**'}]})
r2 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': c2}, timeout=15
)
print('markdown+title:', r2.status_code, r2.text[:100] if r2.status_code != 200 else 'OK')

# Try with note
c3 = json.dumps({'config': {}, 'header': {}, 'elements': [{'tag': 'note', 'elements': [{'tag': 'plain_text', 'content': 'Note text'}]}]})
r3 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': c3}, timeout=15
)
print('note:', r3.status_code, r3.text[:100] if r3.status_code != 200 else 'OK')

# Try with column_set
c4 = json.dumps({'config': {}, 'header': {}, 'elements': [{'tag': 'column_set', 'width': 'spread', 'elements': [{'tag': 'column', 'width': 'weighted', 'weight': 1, 'elements': [{'tag': 'div', 'text': {'tag': 'plain_text', 'content': 'Col1'}}]}]}]})
r4 = requests.post(
    'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
    headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
    json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': c4}, timeout=15
)
print('column_set:', r4.status_code, r4.text[:100] if r4.status_code != 200 else 'OK')
