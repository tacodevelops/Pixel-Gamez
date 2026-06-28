from PIL import Image

def process_icon():
    img = Image.open('app/icon.png').convert('RGBA')
    data = img.getdata()
    
    # Assuming top-left pixel is the background color
    bg = data[0]
    
    new_data = []
    for item in data:
        # If the pixel's RGB matches the background's RGB, make it transparent
        if item[:3] == bg[:3]:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    
    # Resize to something reasonable for a favicon, like 512x512
    img = img.resize((512, 512), Image.Resampling.LANCZOS)
    img.save('app/icon.png', 'PNG')

if __name__ == '__main__':
    process_icon()
