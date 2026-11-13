import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'

const AuthScreen: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate network request for auth
    setTimeout(() => {
      setIsLoading(false)
      navigate('/') // Go to Home map screen on success
    }, 1200)
  }

  const handleGoogleAuth = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      navigate('/')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-primary-green opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-accent-green opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        title="Volver"
        aria-label="Volver"
        className="absolute top-8 left-6 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md text-dark-gray hover:bg-gray-100 transition"
      >
        <i className="fas fa-arrow-left"></i>
      </button>

      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="flex justify-center mb-6">
           <div className="w-16 h-16 bg-primary-green rounded-2xl flex items-center justify-center shadow-medium">
             <i className="fas fa-leaf text-white text-3xl"></i>
           </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-dark-gray tracking-tight">
          {isLogin ? t('login') : t('create_account')}
        </h2>
        <p className="mt-2 text-center text-sm text-medium-gray">
          {t('continue_to')} <span className="font-bold text-primary-green">Gosa</span>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white py-8 px-6 shadow-hard rounded-3xl sm:px-10 border border-gray-100"
        >
          {/* Social Auth (Google) */}
          <div className="mb-6">
            <button
               type="button"
               onClick={handleGoogleAuth}
               className="w-full flex justify-center items-center py-3 px-4 border border-border-gray rounded-xl shadow-sm bg-white text-sm font-semibold text-dark-gray hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
             >
               <img className="h-5 w-5 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
               {t('continue_with_google')}
             </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-gray" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-medium-gray">{t('or_use_email')}</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            <div>
              <label className="block text-sm font-medium text-dark-gray mb-1">
                {t('email')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-border-gray rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent sm:text-sm text-dark-gray bg-gray-50/50"
                  placeholder="ejemplo@correo.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-gray mb-1">
                {t('password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-border-gray rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent sm:text-sm text-dark-gray bg-gray-50/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-green focus:ring-primary-green border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-medium-gray">
                  {t('remember_me')}
                </label>
              </div>

              {isLogin && (
                <div className="text-sm">
                  <a href="#" className="font-semibold text-primary-green hover:text-secondary-green">
                    {t('forgot_password')}
                  </a>
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-primary-green hover:bg-secondary-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <i className="fas fa-circle-notch fa-spin text-xl"></i>
                ) : (
                  isLogin ? t('login') : t('create_account')
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 flex justify-center">
            <p className="text-sm text-medium-gray">
              {isLogin ? t('no_account') : t('already_have_account')}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 font-bold text-primary-green hover:underline focus:outline-none"
              >
                {isLogin ? t('sign_up') : t('login')}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthScreen
