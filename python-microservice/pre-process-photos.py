import face_recognition, json
from os import listdir
from os.path import isfile, join, dirname, abspath
from PIL import Image, ImageOps

target_dir = "/known-pics"
processed_data = {"files": []}

mypath = dirname(abspath(__file__))+target_dir
fileList = [f for f in listdir(mypath) if isfile(join(mypath, f))]

for photo in fileList:
    maxsize = (640,640)
    image = Image.open(mypath+"/"+photo)
    thumb = ImageOps.fit(image, maxsize, Image.ANTIALIAS)
    thumb.save(mypath+"/"+photo)

    print("Classifying: "+ photo)
    known_image = face_recognition.load_image_file("."+target_dir+"/"+photo, mode='RGB')
    temp_code = face_recognition.face_encodings(known_image)
    if len(temp_code) == 0:
        print("\n"+photo+" is not being parsed right for some reason")
        continue
    known_encoding = temp_code[0]
    num_to_str = []
    for num in known_encoding:
    	num_to_str.append(str(num))
    processed_data["files"].append({"fileName":photo, "encoding":num_to_str})

print(processed_data)

with open('processed_data.json', 'w') as outfile:
    json.dump(processed_data, outfile)
