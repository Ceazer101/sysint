import json
import yaml
import csv
import xml.etree.ElementTree as ET

# Read and parse JSON file
with open('../../02._Data_Files/me.json', 'r') as json_file:
    json_data = json.load(json_file)
    print(f"-----Text from json file-----")
    print(json_data)

# Read and parse YAML file
with open('../../02._Data_Files/me.yaml', 'r') as yaml_file:
    yaml_data = yaml.safe_load(yaml_file)
    print(f"-----Text from yaml file-----")
    print(yaml_data)

# Read and parse CSV file
with open('../../02._Data_Files/me.csv', 'r') as csv_file:
    csv_data = csv.DictReader(csv_file)
    print(f"-----Text from csv file-----")
    for row in csv_data:
        print(dict(row))

# Read and parse the XML file
def read_and_parse_xml(filename):
    try:
        tree = ET.parse(filename)
        root = tree.getroot()

        name = root.find('name').text
        age = int(root.find('age').text)

        hobbies = []
        for hobby in root.find('hobbies').findall('hobby'):
            hobbies.append(hobby.text)

        print("-----Text from xml file-----")
        print('Name:', name)
        print('Age:', age)
        print('Hobbies:', ', '.join(hobbies))

    except FileNotFoundError:
        print(f"Error: {filename} not found")
    except Exception as e:
        print("An error occurred:", e)

read_and_parse_xml('../../02._Data_Files/me.xml')

# Read and parse the TXT file
def read_text_file(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            print(f"-----Text from {filename}:-----")
            print(content)
    except FileNotFoundError:
        print(f"Error: {filename} not found")
    except Exception as e:
        print("An error occurred:", e)

read_text_file('../../02._Data_Files/me.txt')