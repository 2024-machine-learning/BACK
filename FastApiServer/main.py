
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# input 형식 : string
class NovelInput(BaseModel):
    novelTitle: str
    novelContent: str

# output 형식 정의 : 곡 제목, 가수
class SongRecommendation(BaseModel):
    novelTitle : str
    novelContent : str
    title : str
    artist : str
    R : int
    G : int
    B : int



# LLM 모델의 응답 생성
@app.post("/recommend", response_model=SongRecommendation)
def recommend(input_data : NovelInput):
    # LLM 모델 호출 (예 : 모델 로직을 호출)

    # 임시 데이터를 반환
    recommendation_result = {
        "novelTitle" : input_data.novelTitle,
        "novelContent" : input_data.novelContent,
        "title" : "곡 제목",
        "artist" : "가수",
        "R" : 0,
        "G" : 0,
        "B" : 0
    }
    return recommendation_result
