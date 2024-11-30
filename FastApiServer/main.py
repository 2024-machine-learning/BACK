from fastapi import FastAPI
from pydantic import BaseModel
from lyrics import inference, embedder, corpus_embeddings, df

# FastAPI 앱 생성
app = FastAPI()

# Input 데이터 형식 정의
class NovelInput(BaseModel):
    novelTitle: str
    novelContent: str

# Output 데이터 형식 정의
class SongRecommendation(BaseModel):
    novelTitle: str
    novelContent: str
    title: str
    artist: str
    R: int
    G: int
    B: int

# 추천 API 엔드포인트
@app.post("/recommend", response_model=SongRecommendation)
def recommend(input_data: NovelInput):
    """
    소설 내용을 기반으로 곡 추천을 반환.
    """
    artist, track, R, G, B = inference(input_data.novelContent, embedder, corpus_embeddings, df)

    # 결과 반환
    recommendation_result = {
        "novelTitle": input_data.novelTitle,
        "novelContent": input_data.novelContent,
        "title": track,
        "artist": artist,
        "R": R,
        "G": G,
        "B": B
    }
    return recommendation_result

