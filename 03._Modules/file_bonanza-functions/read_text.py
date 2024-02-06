import json
#import yaml
import csv

# Read and parse JSON file
with open('../../02._Data_Files/me.json', 'r') as json_file:
    json_data = json.load(json_file)
    print(f"Text from json file")
    print(json_data)

# Read and parse YAML file
#with open('data.yaml', 'r') as yaml_file:
#    yaml_data = yaml.safe_load(yaml_file)
#    print(yaml_data)

# Read and parse CSV file
with open('../../02._Data_Files/me.csv', 'r') as csv_file:
    csv_data = csv.DictReader(csv_file)
    print(f"Text from csv file")
    for row in csv_data:
        print(dict(row))

def read_text_file(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            print(f"Text from {filename}:")
            print(content)
    except FileNotFoundError:
        print(f"Error: {filename} not found")
    except Exception as e:
        print("An error occurred:", e)

read_text_file('../../02._Data_Files/me.txt')