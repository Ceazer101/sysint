import json
import xml.etree.ElementTree as ET
import csv
import yaml

def read_text_file(filename):
    try:
        with open(filename, 'r') as file:
            content = file.read()
            return content
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: {filename} not found")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")

def read_and_parse_xml(filename):
    try:
        tree = ET.parse(filename)
        root = tree.getroot()

        skills = root.find('skills')
        cantrips = [cantrip.text for cantrip in skills.find('cantrips')]
        spells = [spell.text for spell in skills.find('spells')]
        wildshape = {
            'animals': [animal.text for animal in skills.find('wildshape').find('animal')],
            'elementals': [elemental.text for elemental in skills.find('wildshape').find('elemental')]
        }

        parsed_data = {
            'cantrips': cantrips,
            'spells': spells,
            'wildshape': wildshape
        }

        return parsed_data
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: {filename} not found")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")

def read_and_parse_json(filename):
    try:
        with open(filename, 'r') as file:
            json_data = json.load(file)
            return json_data
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: {filename} not found")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")

def read_and_parse_csv(filename):
    try:
        with open(filename, 'r') as file:
            csv_data = list(csv.DictReader(file))
            return csv_data
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: {filename} not found")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")

def read_and_parse_yaml(filename):
    try:
        with open(filename, 'r') as file:
            yaml_data = yaml.safe_load(file)
            return yaml_data
    except FileNotFoundError:
        raise FileNotFoundError(f"Error: {filename} not found")
    except Exception as e:
        raise Exception(f"An error occurred: {e}")