#!/usr/bin/env python3
"""Test Feishu card with minimal content to debug the parse error"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'

# Try simplest possible card
test_cards = []

# Card 1: minimal
c1 = json.dumps({'config': {}, 'header': {}, 'elements': []})
test_cards.append(('minimal', c1))

# Card 2: with title
c2 = json.dumps({'config': {}, 'header': {'title': {'tag': 'plain_text', 'content': 'A'}}, 'elements': []})
test_cards.append(('with_title', c2))

# Card 3: with div element
c3 = json.dumps({'config': {}, 'header': {}, 'elements': [{'tag': 'div', 'text': 'B'}]})
test_cards.append(('with_div', c3))

# Card 4: full simple
c4 = json.dumps({'config': {}, 'header': {'title': {'tag': 'plain_text', 'content': 'Test'}, 'template': 'purple'}, 'elements': [{'tag': 'div', 'text': 'Hello'}]})
test_cards.append(('full_simple', c4))

# Card 5: working text message  
test_cards.append(('TEXT_MSG', json.dumps({'text': 'Hello'})))

for name, content in test_cards:
    if name == 'TEXT_MSG':
        msg_type = 'text'
        content_val = content
    else:
        msg_type = 'interactive'
        content_val = content
    
    r = requests.post(
        'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
        json={'receive_id': chat_id, 'msg_type': msg_type, 'content': content_val},
        timeout=15
    )
    status = r.status_code
    if status != 200:
        try:
            err = r.json().get('msg', '')[:80]
        except:
            err = r.text[:80]
        print(f'{name}: FAIL {status} - {err}')
    else:
        print(f'{name}: OK')
