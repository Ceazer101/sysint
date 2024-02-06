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