# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import spacy
# from model import predict  # model.py에서 predict 함수 가져오기

# FastAPI 애플리케이션 인스턴스 생성
app = FastAPI()

# spaCy 모델 로드 (예시로 spaCy 사용)
#nlp = spacy.load("en_core_web_sm")

#class TextRequest(BaseModel):
    #text: str

#@app.post("/analyze/")
#async def analyze_text(request: TextRequest):
    #doc = nlp(request.text)
    #entities = [(ent.text, ent.label_) for ent in doc.ents]
    #return {"entities": entities}
print("일단 파이썬 연결 성공!")
