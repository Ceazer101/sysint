from fastapi import FastAPI, HTTPException, Request
from read_parse_files import (
    read_text_file,
    read_and_parse_xml,
    read_and_parse_json,
    read_and_parse_csv,
    read_and_parse_yaml
)

app = FastAPI()

serverAUrl = "http://localhost:3000"  # Assuming Server A is running on port 3000

@app.get('/')
async def root():
    return {"message": "Welcome to my API"}

@app.get('/{format}')
async def get_data(format: str, request: Request):
    # Check if the request is coming from a client
    if 'x-server-a-request' not in request.headers:
        try:
            if format == 'txt':
                data = read_text_file('../02._Data_Files/me.txt')
            elif format == 'xml':
                data = read_and_parse_xml('../02._Data_Files/me.xml')
            elif format == 'json':
                data = read_and_parse_json('../02._Data_Files/me.json')
            elif format == 'csv':
                data = read_and_parse_csv('../02._Data_Files/me.csv')
            elif format == 'yaml':
                data = read_and_parse_yaml('../02._Data_Files/me.yaml')
            else:
                raise HTTPException(status_code=404, detail=f"Data format '{format}' not supported")
            
            return {"data": data}  # Return the data in JSON format
        except FileNotFoundError as e:
            raise HTTPException(status_code=404, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
    else:
        return {"message": f"Request from Server A for {format}"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="localhost", port=8080)
