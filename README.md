# Pen To Tone

**텍스트 분위기에 따른 음악 추천 서비스**

---

### API 명세서

**텍스트 기반 음악 및 RGB 값 응답(POST)**

`/ai/song`

**Request Body(JSON)**

```yaml
{
	"novelTitle" : "소설 제목",
	"novelContent" : "소설 내용~"
}
```

**Response Body(JSON)**

```yaml
{
    "novelTitle" : "소설 제목",
    "novelContent" : "소설 내용",
    "title" : "곡 이름",
    "artist" : "가수",
    "R" : 11,
    "G" : 11,
    "B" : 11
}
```
