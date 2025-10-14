# 🎨 KILN Universe - Reference-Based Generation Guide

## 🖼️ **Using Your Preferred Images as Style Guides**

**Perfect approach!** Using existing images you like ensures visual consistency and gives you exactly the aesthetic you want.

---

## 🔧 **Reference-Based Workflow Options**

### **Option A: Image-to-Image Generation (Recommended)**

**Tools that support this:**
- **DALL-E 3**: Upload image + descriptive prompt
- **Midjourney**: Use `--cref` (character reference) or `--sref` (style reference)
- **Runway ML**: Image-to-video with your reference
- **Stable Diffusion**: img2img with ControlNet

**Workflow:**
1. Upload your preferred image
2. Add descriptive prompt for variations
3. Generate new scenes maintaining the same style/characters

### **Option B: Style Consistency Prompting**

**If you can't upload images:**
1. Analyze what you like about your preferred images
2. Extract key descriptive elements
3. Create detailed style prompts based on those elements

### **Option C: Hybrid Approach**
1. Use your preferred images for key character designs
2. Generate variations for different scenes/angles
3. Maintain style consistency across all generations

---

## 📸 **How to Use Your Reference Images**

### **Step 1: Analyze Your Preferred Images**

**For each image you like, identify:**
- **Character appearance** (facial features, skin texture, clothing)
- **Lighting style** (dramatic, soft, color temperature)
- **Composition** (camera angle, framing, depth)
- **Color palette** (earth tones, energy colors, contrast)
- **Atmosphere** (spiritual, cinematic, mysterious)
- **Texture details** (clay, ceramic, steam effects)

### **Step 2: Create Reference-Based Prompts**

**Example format:**
```
[Your scene description] in the exact style of the reference image, maintaining the same character design, lighting, and atmospheric quality. [Additional scene-specific details]
```

### **Step 3: Generate Variations**

**For each new scene:**
1. Use your preferred image as reference
2. Modify only the scene-specific elements
3. Keep character design and style consistent

---

## 🎬 **Scene 1 with Reference Images**

### **If you have a preferred Aude image:**

**Frame 1A - Establishing (using your Aude reference):**
```
The character from the reference image stands defiantly before an ancient ceremonial firing chamber, maintaining the exact same appearance, lighting style, and atmospheric quality. The chamber behind her is built from geometric earth-toned stonework with red glowing glyphs. Cracked clay tiles beneath her feet. An imposing enforcer in ceramic armor stands opposite. Same cinematic composition and spiritual atmosphere as reference.
```

**Frame 1B - Character Focus (using your Aude reference):**
```
Close-up of the character from the reference image, maintaining identical appearance and lighting style. Her body steams with inner resistance, blue luminescent patterns flowing across her skin. She wears the same earth-toned ceremonial robes. Expression determined and powerful. Blue energy around hands and shoulders. Same cinematic quality and spiritual atmosphere.
```

### **If you have a preferred Enforcer image:**

**Frame 1C - Enforcer Reaction (using your Enforcer reference):**
```
The armored character from the reference image, maintaining exact same armor design and atmospheric quality. Shows stress fractures forming across the mask. Red command glyphs flicker in the air. Harsh institutional lighting. Steam drifting across scene. Same imposing presence and ceremonial atmosphere as reference.
```

### **If you have a preferred environment/chamber image:**

**Frame 1D - Environment (using your chamber reference):**
```
The exact same chamber and architectural style from the reference image. Ancient geometric stonework, red glowing glyphs, cracked clay tiles. Both characters present - the woman with blue energy and the armored enforcer. Maximum tension between red authority and blue consciousness. Same lighting and atmospheric quality as reference.
```

---

## 🛠️ **Tool-Specific Instructions**

### **DALL-E 3 (with image upload):**
1. Upload your preferred image
2. Prompt: "Create a variation of this character/scene but [scene-specific changes]"
3. Maintain style while adding new elements

### **Midjourney (with references):**
```
[Your scene description] --cref [character reference URL] --sref [style reference URL] --ar 2.39:1 --v 6 --style raw
```

### **Runway ML (image-to-video):**
1. Upload your preferred key frame
2. Prompt: "Camera slowly pushes in, steam intensifies, blue energy grows"
3. Generate 3-4 second motion clip

### **Stable Diffusion (img2img):**
1. Use your image as base
2. Set denoising strength 0.3-0.5 (keeps original style)
3. Add scene-specific prompts

---

## 📁 **Reference Organization**

### **Create a reference folder:**
```
KILN_References/
├── Character_Aude_Preferred.png
├── Character_Enforcer_Preferred.png
├── Environment_Chamber_Preferred.png
├── Lighting_Style_Preferred.png
└── Energy_Effects_Preferred.png
```

### **Document what you like:**
```
Reference_Notes.txt:
- Aude: Clay skin texture, blue energy style, facial features
- Enforcer: Armor design, mask details, imposing stance
- Chamber: Stone texture, glyph placement, architectural style
- Lighting: Contrast levels, color temperature, dramatic shadows
- Energy: Blue glow style, steam effects, particle systems
```

---

## 🎯 **Quality Control with References**

### **Consistency Checklist:**
- [ ] Character faces match reference images
- [ ] Clothing/armor style consistent across scenes
- [ ] Lighting maintains same quality and mood
- [ ] Color palette stays true to references
- [ ] Energy effects match preferred style
- [ ] Overall atmosphere remains consistent

### **Generation Tips:**
- **Start with your strongest reference** (best character design)
- **Generate multiple variations** to find the best matches
- **Use specific style descriptors** from your preferred images
- **Maintain consistent prompting language** across all generations

---

## 🚀 **Next Steps with Your References**

### **Immediate Actions:**
1. **Save your preferred images** in the reference folder
2. **Analyze the visual elements** you like most
3. **Create scene-specific prompts** using those elements
4. **Generate Frame 1A** using your preferred style

### **Quality Validation:**
1. **Compare each new generation** to your references
2. **Adjust prompts** if style drifts from your preferred look
3. **Build a consistent style guide** from successful generations

### **Expand to Full Video:**
1. **Use same references** for all 5 scenes
2. **Maintain character consistency** across the entire video
3. **Create a cohesive visual narrative** with your preferred aesthetic

---

## 💡 **Pro Tips for Reference-Based Generation**

### **Character Consistency:**
- Use the same character reference for all scenes featuring that character
- Specify "same facial features" or "identical appearance" in prompts
- Generate multiple angles/poses of the same character design

### **Style Consistency:**
- Reference the lighting style in every prompt
- Maintain the same color palette descriptors
- Use consistent atmospheric descriptions

### **Scene Transitions:**
- Ensure new scenes feel like they belong in the same world
- Maintain visual continuity through consistent style references
- Test scene flow by viewing generated frames in sequence

---

**🎬 Ready to use your preferred images as the foundation for an amazing KILN Universe video!**

*Upload your preferred images and let's adapt the prompts to match your exact vision.*