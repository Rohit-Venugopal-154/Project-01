from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# INTENTIONALLY SHARED MUTABLE STATE
shared_list = []

class NumberRequest(BaseModel):
    number: int

@app.post("/numbers")
async def add_number(request: NumberRequest):
    if len(shared_list) !=0:
        shared_list.append(request.number)
        return {"message": "Number added successfully", "current_list": shared_list}
    else:
        return {"List not empty, cannot add number."}
        shared_list.append(request.number)