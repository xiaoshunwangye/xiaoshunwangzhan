# 联系表单后端配置（EmailJS）

当前联系表单通过 [EmailJS](https://www.emailjs.com/) 直接从浏览器发送邮件到你的邮箱，无需自建后端。

## 当前状态

- 发送逻辑：`src/components/Contact.tsx`
- 发送方式：`fetch` 调用 EmailJS REST API
- 不需要安装额外 npm 包

## 1. 注册 EmailJS

1. 打开 https://www.emailjs.com/
2. 用邮箱注册并登录（建议用你要收信的 163 邮箱注册）
3. 登录后进入 Dashboard

## 2. 创建邮件服务（Email Service）

1. 左侧菜单 → **Email Services**
2. 点击 **Add New Service**
3. 选择邮件服务商：
   - 推荐选 **163**（如果你要发到 163 邮箱）
   - 也可以选 Gmail、Outlook 等
4. 按提示连接你的邮箱账号
5. 创建成功后，会得到一个 **Service ID**，例如 `service_abc123`

> 如果连 163 邮箱时失败，可以选 EmailJS 的 **Default Email Service** 或 Gmail。

## 3. 创建邮件模板（Email Template）

1. 左侧菜单 → **Email Templates**
2. 点击 **Create New Template**
3. 在模板里填写：

**Subject（邮件主题）：**
```
来自 {{name}} 的合作咨询
```

**To Email（收件邮箱）：**
```
15113609996@163.com
```

**Content（邮件正文，可用 HTML）：**
```html
<p><strong>称呼：</strong>{{name}}</p>
<p><strong>联系方式：</strong>{{contact}}</p>
<p><strong>留言内容：</strong></p>
<p>{{message}}</p>
```

4. 保存后，会得到一个 **Template ID**，例如 `template_xyz789`

## 4. 获取 Public Key

1. 左侧菜单 → **Account**（账户）
2. 找到 **Public Key**，例如 `AbC123XyZ_public_key`
3. 复制备用

## 5. 填入代码

打开 `src/components/Contact.tsx`，把第 29-31 行的占位符替换：

```ts
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

改成你刚才拿到的真实值：

```ts
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'AbC123XyZ_public_key';
```

## 6. 本地测试

```powershell
cd "e:\vs code daima\portfolio-site"
npm run dev
```

打开页面 → 填表 → 点「发送邮件」。

如果显示「✓ 留言已发送」，并且你的 163 邮箱收到邮件 → 配置成功。

## 7. 部署

```powershell
git add .
git commit -m "feat: 联系表单接入 EmailJS"
git push
```

## 备注

- EmailJS 免费版每月 200 封邮件，远超作品集使用需求
- 如果 163 服务连接不上，换成 Gmail 或 Default Email Service 再试
