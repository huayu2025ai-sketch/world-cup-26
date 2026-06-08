#!/usr/bin/env python3
"""Test div element text field types"""
import json, os, requests

app_id = 'cli_a9709d19aaf41bd8'
app_secret = os.environ.get('FEISHU_APP_SECRET', '')
resp = requests.post('https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal',
    json={'app_id': app_id, 'app_secret': app_secret}, timeout=10)
token = resp.json().get('tenant_access_token', '')

chat_id = 'oc_f7119b6969f746e9699c0d384716ed0e'

tests = [
    ('div_str', {'tag': 'div', 'text': 'Hello'}),
    ('div_obj', {'tag': 'div', 'text': {'tag': 'plain_text', 'content': 'Hello'}}),
    ('div_content_str', {'tag': 'div', 'content': 'Hello'}),
    ('div_fields_str', {'tag': 'div', 'fields': [{'text': {'tag': 'plain_text', 'content': 'F1'}}]}),
    ('div_i18n', {'tag': 'div', 'i18n': {'zh_cn': {'tag': 'plain_text', 'content': 'Chinese'}}}),
]

for name, elem in tests:
    c = json.dumps({'config': {}, 'header': {}, 'elements': [elem]})
    r = requests.post(
        'https://open.feishu.cn/open-apis/im/v1/messages?receive_id_type=chat_id',
        headers={'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'},
        json={'receive_id': chat_id, 'msg_type': 'interactive', 'content': c}, timeout=15
    )
    if r.status_code != 200:
        try:
            err = r.json().get('msg', '')[:80]
        except:
            err = r.text[:80]
        print(f'{name}: FAIL {r.status_code} - {err}')
    else:
        print(f'{name}: OK')
