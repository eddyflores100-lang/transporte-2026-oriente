import React from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'es', name: t('spanish'), flag: '🇪🇸' },
    { code: 'en', name: t('english'), flag: '🇺🇸' },
    { code: 'qu', name: t('quechua'), flag: '🇵🇪' },
  ]

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-lg">{t('language')}</h3>
      <div className="grid grid-cols-3 gap-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'es' | 'en' | 'qu')}
            className={`p-4 rounded-xl border-2 transition-all ${
              language === lang.code
                ? 'border-primary-green bg-light-green text-primary-green'
                : 'border-light-gray bg-white text-medium-gray hover:border-accent-green'
            }`}
          >
            <div className="text-2xl mb-2">{lang.flag}</div>
            <div className="font-medium">{lang.name}</div>
          </button>
        ))}
      </div>
      <p className="text-sm text-medium-gray mt-2">
        {language === 'es' && 'La aplicación se actualizará al español.'}
        {language === 'en' && 'The app will update to English.'}
        {language === 'qu' && "App kichwaman t'ikrachkan."}
      </p>
    </div>
  )
}

export default LanguageSelector