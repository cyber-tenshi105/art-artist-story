import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = "YOUR_OPENAI_KEY_HERE"; // ← 换成你自己的

app.post("/generate", async (req, res) => {
  const { artistName, style, experience, personality, keywords } = req.body;

  const prompt = `
为一个网络画手生成一个“艺术包装内容”。
根据以下信息生成：
- 画手名称：${artistName}
- 创作风格：${style}
- 从业经历：${experience}
- 性格特点：${personality}
- 关键词：${keywords}

请生成：
1. 一段艺术家背景故事（300 字）
2. 一段创作理念介绍（200 字）
3. 一段创作过程描述（150 字）
4. 一个可用于社交媒体的宣传口号（10～20 字）

整体语气专业、有艺术感。
`;

  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await result.json();
    res.json({ text: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI生成失败" });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`后端已启动：http://localhost:${PORT}`));


    textarea {
        height: 100px;
    }

    button {
        width: 100%;
        padding: 15px;
        background: linear-gradient(90deg, #f7d1ff, #b8aafc);
        color: #2e2e2e;
        border: none;
        font-weight: bold;
        font-size: 17px;
        border-radius: 16px;
        cursor: pointer;
        margin-top: 18px;
        transition: 0.35s;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }

    button:hover {
        transform: translateY(-2px);
        background: linear-gradient(90deg, #fff, #d9d1ff);
    }

    #result {
        background: rgba(255,255,255,0.25);
        margin-top: 25px;
        padding: 20px;
        border-radius: 14px;
        white-space: pre-wrap;
        color: #fff;
        font-size: 16px;
        border-left: 4px solid #f1eaff;
    }

    /* AI 加载动画 */
    .loader {
        margin: 20px auto;
        width: 55px;
        height: 55px;
        border-radius: 50%;
        border: 4px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        animation: spin 1s infinite linear;
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }

</style>
</head>
<body>

<div class="glass">
<h1>AI 画手包装生成器</h1>

<!-- 画手名称 -->
<label>画手名称</label>
<input id="artistName" placeholder="例如：星野弥生 / 小霁 / 你的昵称">

<!-- 年龄段 -->
<label>年龄段</label>
<select id="age">
    <option value="">选择年龄段</option>
    <option value="90后">90后</option>
    <option value="95后">95后</option>
    <option value="00后">00后</option>
    <option value="05后">05后</option>
    <option value="自定义">自定义输入</option>
</select>
<input id="ageCustom" placeholder="自定义年龄段：" style="display:none;">

<!-- 风格 -->
<label>绘画风格</label>
<select id="style">
    <option value="">选择绘画风格</option>
    <option value="二次元">二次元</option>
    <option value="水墨">水墨</option>
    <option value="厚涂">厚涂</option>
    <option value="赛博朋克">赛博朋克</option>
    <option value="黑白漫画">黑白漫画</option>
    <option value="幻想插画">幻想插画</option>
    <option value="潮流艺术">潮流艺术</option>
    <option value="自定义">自定义输入</option>
</select>
<input id="styleCustom" placeholder="自定义风格：" style="display:none;">

<!-- 从业经历 -->
<label>从业经历</label>
<select id="experience">
    <option value="">选择经历</option>
    <option value="自学 2 年">自学 2 年</option>
    <option value="自学 3 年">自学 3 年</option>
    <option value="半职业画手">半职业画手</option>
    <option value="自由插画师">自由插画师</option>
    <option value="接稿画师">接稿画师</option>
    <option value="自定义">自定义输入</option>
</select>
<input id="experienceCustom" placeholder="自定义经历：" style="display:none;">

<!-- 绘画特点 -->
<label>绘画特点</label>
<select id="features">
    <option value="">选择特点</option>
    <option value="色彩柔和">色彩柔和</option>
    <option value="光影表现细腻">光影表现细腻</option>
    <option value="线条干净">线条干净</option>
    <option value="构图独特">构图独特</option>
    <option value="画面富有情绪张力">画面富有情绪张力</option>
    <option value="自定义">自定义输入</option>
</select>
<input id="featuresCustom" placeholder="自定义特点：" style="display:none;">

<!-- 性格 -->
<label>性格特质</label>
<select id="personality">
    <option value="">选择性格</option>
    <option value="安静">安静</option>
    <option value="敏感细腻">敏感细腻</option>
    <option value="外向热情">外向热情</option>
    <option value="内敛而富有创造力">内敛而富有创造力</option>
    <option value="专注且极具耐心">专注且极具耐心</option>
    <option value="自定义">自定义输入</option>
</select>
<input id="personalityCustom" placeholder="自定义性格：" style="display:none;">

<!-- 关键词 -->
<label>关键词（可选）</label>
<textarea id="keywords" placeholder="如：梦境、星空、孤独、少女、温柔、混乱…"></textarea>

<button onclick="generate()">生成艺术包装</button>

<div id="result"></div>

</div>

<script>
// 切换自定义输入
function linkCustom(selectId, inputId) {
    document.getElementById(selectId).addEventListener("change", function () {
        document.getElementById(inputId).style.display = (this.value === "自定义") ? "block" : "none";
    });
}
linkCustom("age", "ageCustom");
linkCustom("style", "styleCustom");
linkCustom("experience", "experienceCustom");
linkCustom("features", "featuresCustom");
linkCustom("personality", "personalityCustom");


// AI生成
async function generate() {
    const resultBox = document.getElementById("result");
    resultBox.innerHTML = '<div class="loader"></div><div style="text-align:center;margin-top:10px;">正在生成艺术家包装...</div>';

    function value(select, input) {
        return document.getElementById(select).value === "自定义"
            ? document.getElementById(input).value
            : document.getElementById(select).value;
    }

    const data = {
        artistName: document.getElementById("artistName").value,
        age: value("age", "ageCustom"),
        style: value("style", "styleCustom"),
        experience: value("experience", "experienceCustom"),
        features: value("features", "featuresCustom"),
        personality: value("personality", "personalityCustom"),
        keywords: document.getElementById("keywords").value
    };

    // ⚠ 填上你的 Render 后端 API 地址
    const API_URL = "https://你的-render-地址.onrender.com/generate";

    const res = await fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    const json = await res.json();
    resultBox.innerHTML = json.text;
}
</script>

</body>
</html>
