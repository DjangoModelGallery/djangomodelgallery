import json

def update_json(markdown_file, json_file):
    f = open(markdown_file, "w")
    f.close()
    # # Markdown 파일을 읽어옴
    # with open(markdown_file, 'r', encoding='utf-8') as f:
    #     markdown_data = f.read()

    # # Markdown 파일을 파싱하여 데이터 추출
    # # 여기서는 단순히 예시로 한 줄씩 읽어와서 처리하는 것으로 가정
    # parsed_data = []
    # for line in markdown_data.split('\n'):
    #     # 각 줄에서 필요한 데이터 추출
    #     # 예시: 제목과 내용을 ':' 기준으로 분리하여 딕셔너리로 저장
    #     title, content = line.split(':', 1)
    #     parsed_data.append({'title': title.strip(), 'content': content.strip()})

    # # 기존 JSON 파일 읽기
    # with open(json_file, 'r') as f:
    #     json_data = json.load(f)

    # # 새로 파싱한 데이터를 기존 JSON 데이터에 추가
    # json_data.extend(parsed_data)

    # # JSON 파일 업데이트
    # with open(json_file, 'w') as f:
    #     json.dump(json_data, f, indent=4)

# Markdown 파일과 JSON 파일 경로 설정
markdown_file = 'example.md'
json_file = 'postsList.json'

# 업데이트 함수 호출
update_json(markdown_file, json_file)