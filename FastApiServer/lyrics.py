import pandas as pd
import numpy as np
from sentence_transformers import SentenceTransformer, util
import torch

# 데이터 및 모델 로드
df = pd.read_csv('./merged.csv')
embedder = SentenceTransformer('jhgan/ko-sroberta-multitask')
corpus_embeddings = torch.load("sbert_embeddings.pt")


def inference(query, embedder, corpus_embeddings, df):
    """
    주어진 쿼리에 대해 가장 유사한 가사와 해당 곡 정보 반환.
    """
    # Query 임베딩 생성
    query_embeddings = embedder.encode(query, convert_to_tensor=True)

    # GPU 사용 가능 여부 확인 및 텐서 이동
    if torch.cuda.is_available():
        query_embeddings = query_embeddings.to('cuda')
        corpus_embeddings = corpus_embeddings.to('cuda')
    else:
        query_embeddings = query_embeddings.cpu()
        corpus_embeddings = corpus_embeddings.cpu()

    # 유사도 계산
    cos_scores = util.pytorch_cos_sim(query_embeddings, corpus_embeddings)[0]
    cos_scores = cos_scores.cpu()  # 연산 후 CPU로 이동

    # 가장 유사한 결과 추출
    top_results = np.argpartition(-cos_scores, 1)[:1]
    artist_name = df.iloc[top_results]['artist_names'].to_string(index=False)
    track_name = df.iloc[top_results]['track_name'].to_string(index=False)

    # 임의의 RGB 값 생성
    R, G, B = np.random.randint(0, 256, 3)
    return artist_name, track_name, R, G, B
