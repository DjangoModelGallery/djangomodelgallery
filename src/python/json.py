import sys
import json
import os


def read_file(file):
    if os.path.exists(file):
        with open(file, "r") as f:
            return f.read()
    else:
        return f"Error: {file} does not exist."


def main():
    files = sys.argv[1:]
    if len(files) == 0:
        print("Usage: python json.py <file1> <file2> ...")
        sys.exit(1)

    result = {}
    for file in files:
        result[file] = read_file(file).split()
    print(result)


if __name__ == "__main__":

    main()
