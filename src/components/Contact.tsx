import { useEffect, useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

gsap.registerPlugin(ScrollTrigger);

interface FormState {
  name: string;
  contact: string;
  message: string;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^1[3-9]\d{9}$/;

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ name: '', contact: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'sending'>('idle');

  // EmailJS 配置
  const EMAILJS_SERVICE_ID = 'service_fb1ochp';
  const EMAILJS_TEMPLATE_ID = 'template_9ctu2mn';
  const EMAILJS_PUBLIC_KEY = 'iE98gktQ1pz2QCPOM';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const label = section.querySelector('.section-label');
      const title = section.querySelector('h2');

      if (label) {
        gsap.fromTo(label,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      if (title) {
        gsap.fromTo(title,
          { y: 60, opacity: 0, scale: 0.85 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {};
    if (!values.name.trim()) {
      next.name = '请填写您的称呼';
    } else if (values.name.trim().length > 20) {
      next.name = '称呼过长（不超过 20 字）';
    }

    const contact = values.contact.trim();
    if (!contact) {
      next.contact = '请填写联系方式';
    } else if (!EMAIL_REGEX.test(contact) && !PHONE_REGEX.test(contact)) {
      next.contact = '请填写有效的邮箱或手机号';
    }

    if (!values.message.trim()) {
      next.message = '请填写留言内容';
    } else if (values.message.trim().length < 5) {
      next.message = '留言内容太短（至少 5 个字）';
    } else if (values.message.trim().length > 500) {
      next.message = '留言内容过长（不超过 500 字）';
    }

    return next;
  };

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    // 输入时清除该字段的错误
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = validate(form);
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: form.name.trim(),
            email: form.contact.trim(),
            message: form.message.trim(),
            title: `来自 ${form.name.trim()} 的合作咨询`,
          },
        }),
      });

      if (res.ok) {
        setStatus('success');
        setForm({ name: '', contact: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        const text = await res.text().catch(() => '');
        console.error('EmailJS error:', res.status, text);
        setStatus('error');
      }
    } catch (err) {
      console.error('EmailJS exception:', err);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <BorderGlow
        edgeSensitivity={30}
        glowColor="184 134 11"
        backgroundColor="#0d1117"
        borderRadius={40}
        glowRadius={40}
        glowIntensity={1.0}
        coneSpread={25}
        animated={false}
        colors={['#b8860b', '#daa520', '#cd7f32']}
        fillOpacity={0.3}
      >
        <div className="contact-wrap">
          <span className="section-label">联系我</span>
          <h2>想聊聊合作或者工作机会？直接联系我</h2>

          <div className="contact-info">
            <p>📞 19860398304</p>
            <p>✉️ 15113609996@163.com</p>
            <p>💬 微信：Y-18-86-ds</p>
            <p>📍 求职意向：设计 · 期望城市：佛山 · 期望薪资：5-8K</p>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="contact-form-row">
              <div className="contact-form-field">
                <label htmlFor="contact-name">您的称呼</label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  placeholder="怎么称呼你？"
                  maxLength={20}
                  aria-invalid={!!errors.name}
                />
                {errors.name && <span className="contact-form-error">{errors.name}</span>}
              </div>

              <div className="contact-form-field">
                <label htmlFor="contact-info">邮箱或手机号</label>
                <input
                  id="contact-info"
                  type="text"
                  value={form.contact}
                  onChange={handleChange('contact')}
                  placeholder="请输入邮箱或手机号"
                  aria-invalid={!!errors.contact}
                />
                {errors.contact && <span className="contact-form-error">{errors.contact}</span>}
              </div>
            </div>

            <div className="contact-form-field">
              <label htmlFor="contact-message">留言内容</label>
              <textarea
                id="contact-message"
                rows={4}
                value={form.message}
                onChange={handleChange('message')}
                  placeholder="随便聊，说下你想聊啥"
                maxLength={500}
                aria-invalid={!!errors.message}
              />
              {errors.message && <span className="contact-form-error">{errors.message}</span>}
            </div>

            <button type="submit" className="contact-form-submit" disabled={status === 'sending'}>
              {status === 'sending' ? '发送中…' : '发送邮件'}
            </button>

            {status === 'success' && (
              <p className="contact-form-success">
                ✓ 留言已发送，我会尽快回复你
              </p>
            )}
            {status === 'error' && (
              <p className="contact-form-error">
                ✗ 发送失败，请稍后重试，或直接邮件联系 15113609996@163.com
              </p>
            )}
          </form>
        </div>
      </BorderGlow>
    </section>
  );
};

export default Contact;
