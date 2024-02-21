from fastapi import FastAPI, HTTPException
import json

app = FastAPI()

def read_json_file(filename):
    try:
        with open(filename, 'r') as json_file:
            return json.load(json_file)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail=f"Error: {filename} not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {e}")

# Sample data for demonstration
data = {
    'JSON': read_json_file('../02._Data_Files/me.json')
}

@app.get('/')
async def root():
    return {"message": "Welcome to my API"}

@app.get('/{format}')
async def get_data(format: str):
    if format.upper() not in data:
        raise HTTPException(status_code=404, detail=f"Data format '{format}' not supported")
    return data[format.upper()]

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="localhost", port=8080)
