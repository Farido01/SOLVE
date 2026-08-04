'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'input' | 'otp'>('input');
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone');
  const [contactValue, setContactValue] = useState('');
  const [otpValue, setOtpValue] = useState(['', '', '', '']);
  const [isRegister, setIsRegister] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue.trim()) {
      setErrorMsg('Пожалуйста, введите номер телефона или E-mail');
      return;
    }
    setErrorMsg('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 600);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[0];
    const newOtp = [...otpValue];
    newOtp[index] = val;
    setOtpValue(newOtp);

    // Auto-focus next input
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.some((digit) => !digit)) {
      setErrorMsg('Введите полный 4-значный код из SMS');
      return;
    }
    setIsLoading(true);

    // Save auth session to localStorage
    const userData = {
      isLoggedIn: true,
      name: nameValue || 'Александр В.',
      phone: authMethod === 'phone' ? contactValue : '+7 (999) 000-12-34',
      email: authMethod === 'email' ? contactValue : 'user@solve-studio.ru',
    };

    localStorage.setItem('solve_user_session', JSON.stringify(userData));

    setTimeout(() => {
      setIsLoading(false);
      router.push('/profile');
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F9F8] text-[#0D0E10] select-none font-sans">
      <Header />

      <main className="flex-1 mt-14 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xl space-y-6 font-sans">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-neutral-400 font-mono block">
              SOLVE MEMBERSHIP ACCESS
            </span>
            <h1 className="font-display text-3xl sm:text-4xl text-[#0D0E10] uppercase tracking-wide leading-none">
              {step === 'input' ? (isRegister ? 'РЕГИСТРАЦИЯ' : 'ВХОД В АККАУНТ') : 'ПОДТВЕРЖДЕНИЕ'}
            </h1>
            <p className="text-xs text-neutral-500 font-sans">
              {step === 'input'
                ? 'Войдите, чтобы получать доступ к личным адресам, истории заказов и закрытым релизам SOLVE.'
                : `Мы отправили 4-значный код на ${contactValue}`}
            </p>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-bold text-center border border-red-200">
              {errorMsg}
            </div>
          )}

          {step === 'input' ? (
            /* Step 1: Phone/Email Form */
            <form onSubmit={handleSendCode} className="space-y-4">
              
              {/* Registration Name Field */}
              {isRegister && (
                <div className="space-y-1">
                  <label className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 font-mono block">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    required
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                    placeholder="Например: Александр"
                    className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black font-medium"
                  />
                </div>
              )}

              {/* Method Toggle Buttons */}
              <div className="flex bg-[#F9F9F8] p-1 rounded-2xl border border-neutral-200/80 text-xs font-mono font-bold">
                <button
                  type="button"
                  onClick={() => { setAuthMethod('phone'); setContactValue(''); }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'phone' ? 'bg-black text-white shadow-2xs' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Телефон</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMethod('email'); setContactValue(''); }}
                  className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    authMethod === 'email' ? 'bg-black text-white shadow-2xs' : 'text-neutral-500 hover:text-black'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>E-mail</span>
                </button>
              </div>

              {/* Input Field */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-500 font-mono block">
                  {authMethod === 'phone' ? 'Номер телефона' : 'Электронная почта'}
                </label>
                <input
                  type={authMethod === 'phone' ? 'tel' : 'email'}
                  required
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  placeholder={authMethod === 'phone' ? '+7 (999) 000-00-00' : 'name@example.com'}
                  className="w-full px-4 py-3 text-xs bg-[#F9F9F8] rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black font-mono font-bold"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'ОТПРАВКА...' : 'ПОЛУЧИТЬ КОД В СМС'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              {/* Toggle Register/Login */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
                  className="text-xs font-bold text-neutral-600 hover:text-black underline font-mono"
                >
                  {isRegister ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: OTP SMS Code Verification Form */
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="flex justify-center gap-3 py-2">
                {otpValue.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 text-center text-xl font-mono font-black bg-[#F9F9F8] border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black shadow-2xs"
                  />
                ))}
              </div>

              <div className="text-center">
                <span className="text-[11px] text-neutral-400 font-mono block">
                  Код отправлен (демо код: введите любые 4 цифры, например <strong className="text-black">1 2 3 4</strong>)
                </span>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isLoading ? 'ПРОВЕРКА...' : 'ПОДТВЕРДИТЬ ВХОД'}</span>
              </Button>

              <button
                type="button"
                onClick={() => setStep('input')}
                className="w-full text-xs font-bold text-neutral-500 hover:text-black font-mono text-center block"
              >
                ← Изменить контактные данные
              </button>
            </form>
          )}

          {/* Security Note */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[10px] font-mono text-neutral-400">
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>Ваши данные защищены сквозным шифрованием SOLVE Guard</span>
          </div>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
