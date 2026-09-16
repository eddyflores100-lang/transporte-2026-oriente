import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useLanguage } from '../contexts/LanguageContext'

const personalSchema = yup.object({
  fullName: yup.string().required('Nombre completo es requerido'),
  email: yup.string().email('Email inválido').required('Email es requerido'),
  phone: yup.string().required('Teléfono es requerido'),
  address: yup.string().required('Dirección es requerida'),
})

const documentsSchema = yup.object({
  licenseNumber: yup.string().required('Número de licencia es requerido'),
  licenseExpiry: yup.date().required('Fecha de expiración es requerida'),
  idNumber: yup.string().required('Cédula es requerida'),
  criminalRecord: yup.mixed().required('Archivo de antecedentes es requerido'),
})

const vehicleSchema = yup.object({
  plate: yup.string().required('Placa es requerida'),
  vehicleType: yup.string().required('Tipo de vehículo es requerido'),
  model: yup.string().required('Modelo es requerido'),
  year: yup.number().required('Año es requerido'),
  color: yup.string().required('Color es requerido'),
  insuranceNumber: yup.string().required('Número de seguro es requerido'),
})

const verificationSchema = yup.object({
  termsAccepted: yup.bool().oneOf([true], 'Debe aceptar los términos'),
  privacyAccepted: yup.bool().oneOf([true], 'Debe aceptar la política de privacidad'),
})

const DriverRegistration: React.FC = () => {
  const { t } = useLanguage()
  const [step, setStep] = useState(1)

  const { register: registerPersonal, handleSubmit: handlePersonalSubmit, formState: { errors: personalErrors } } = useForm({
    resolver: yupResolver(personalSchema),
  })
  const { register: registerDocuments, handleSubmit: handleDocumentsSubmit, formState: { errors: documentsErrors } } = useForm({
    resolver: yupResolver(documentsSchema),
  })
  const { register: registerVehicle, handleSubmit: handleVehicleSubmit, formState: { errors: vehicleErrors } } = useForm({
    resolver: yupResolver(vehicleSchema),
  })
  const { register: registerVerification, handleSubmit: handleVerificationSubmit, formState: { errors: verificationErrors } } = useForm({
    resolver: yupResolver(verificationSchema),
  })

  const steps = [
    { id: 1, label: t('step_personal'), icon: 'fas fa-user' },
    { id: 2, label: t('step_documents'), icon: 'fas fa-file-alt' },
    { id: 3, label: t('step_vehicle'), icon: 'fas fa-car' },
    { id: 4, label: t('step_verification'), icon: 'fas fa-check-circle' },
  ]

  const onSubmitPersonal = (data: any) => {
    console.log(data)
    setStep(2)
  }
  const onSubmitDocuments = (data: any) => {
    console.log(data)
    setStep(3)
  }
  const onSubmitVehicle = (data: any) => {
    console.log(data)
    setStep(4)
  }
  const onSubmitVerification = (data: any) => {
    console.log(data)
    alert('Registro enviado para verificación')
  }

  return (
    <div className="p-6 pb-24">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary-green">{t('driver_registration')}</h1>
        <p className="text-medium-gray">{t('driver_registration_subtitle')}</p>
      </motion.header>

      {/* Stepper */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-light-gray -z-10"></div>
        {steps.map((s) => (
          <div key={s.id} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s.id ? 'bg-primary-green text-white' : 'bg-light-gray text-medium-gray'}`}>
              <i className={s.icon}></i>
            </div>
            <span className="text-xs mt-2 font-medium">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={step}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        className="card"
      >
        {step === 1 && (
          <form onSubmit={handlePersonalSubmit(onSubmitPersonal)}>
            <h2 className="text-xl font-bold mb-4">{t('step_personal')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre completo</label>
                <input className="input-field" {...registerPersonal('fullName')} />
                {personalErrors.fullName && <p className="text-error text-sm">{personalErrors.fullName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input className="input-field" type="email" {...registerPersonal('email')} />
                {personalErrors.email && <p className="text-error text-sm">{personalErrors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input className="input-field" type="tel" {...registerPersonal('phone')} />
                {personalErrors.phone && <p className="text-error text-sm">{personalErrors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Dirección</label>
                <input className="input-field" {...registerPersonal('address')} />
                {personalErrors.address && <p className="text-error text-sm">{personalErrors.address.message}</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" className="btn-primary">{t('next')}</button>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleDocumentsSubmit(onSubmitDocuments)}>
            <h2 className="text-xl font-bold mb-4">{t('step_documents')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Número de licencia de conducir</label>
                <input className="input-field" {...registerDocuments('licenseNumber')} />
                {documentsErrors.licenseNumber && <p className="text-error text-sm">{documentsErrors.licenseNumber.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha de expiración</label>
                <input className="input-field" type="date" {...registerDocuments('licenseExpiry')} />
                {documentsErrors.licenseExpiry && <p className="text-error text-sm">{documentsErrors.licenseExpiry.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Cédula de identidad</label>
                <input className="input-field" {...registerDocuments('idNumber')} />
                {documentsErrors.idNumber && <p className="text-error text-sm">{documentsErrors.idNumber.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Antecedentes penales (archivo)</label>
                <input className="input-field" type="file" {...registerDocuments('criminalRecord')} />
                {documentsErrors.criminalRecord && <p className="text-error text-sm">{documentsErrors.criminalRecord.message}</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>{t('previous')}</button>
              <button type="submit" className="btn-primary">{t('next')}</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleVehicleSubmit(onSubmitVehicle)}>
            <h2 className="text-xl font-bold mb-4">{t('step_vehicle')}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Placa del vehículo</label>
                <input className="input-field" {...registerVehicle('plate')} />
                {vehicleErrors.plate && <p className="text-error text-sm">{vehicleErrors.plate.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo de vehículo</label>
                <select className="input-field" {...registerVehicle('vehicleType')}>
                  <option value="">Seleccionar</option>
                  <option value="camioneta">Camioneta</option>
                  <option value="moto">Moto</option>
                  <option value="lancha">Lancha</option>
                  <option value="camion">Camión</option>
                  <option value="flete">Flete</option>
                </select>
                {vehicleErrors.vehicleType && <p className="text-error text-sm">{vehicleErrors.vehicleType.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Modelo</label>
                <input className="input-field" {...registerVehicle('model')} />
                {vehicleErrors.model && <p className="text-error text-sm">{vehicleErrors.model.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Año</label>
                <input className="input-field" type="number" {...registerVehicle('year')} />
                {vehicleErrors.year && <p className="text-error text-sm">{vehicleErrors.year.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input className="input-field" {...registerVehicle('color')} />
                {vehicleErrors.color && <p className="text-error text-sm">{vehicleErrors.color.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Número de seguro</label>
                <input className="input-field" {...registerVehicle('insuranceNumber')} />
                {vehicleErrors.insuranceNumber && <p className="text-error text-sm">{vehicleErrors.insuranceNumber.message}</p>}
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>{t('previous')}</button>
              <button type="submit" className="btn-primary">{t('next')}</button>
            </div>
          </form>
        )}

        {step === 4 && (
          <form onSubmit={handleVerificationSubmit(onSubmitVerification)}>
            <h2 className="text-xl font-bold mb-4">{t('step_verification')}</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <input type="checkbox" id="terms" {...registerVerification('termsAccepted')} className="mt-1 mr-3" />
                <label htmlFor="terms" className="text-sm">
                  Acepto los términos y condiciones del servicio como conductor de OrienteGo.
                </label>
              </div>
              {verificationErrors.termsAccepted && <p className="text-error text-sm">{verificationErrors.termsAccepted.message}</p>}
              <div className="flex items-start">
                <input type="checkbox" id="privacy" {...registerVerification('privacyAccepted')} className="mt-1 mr-3" />
                <label htmlFor="privacy" className="text-sm">
                  Acepto la política de privacidad y el manejo de mis datos personales.
                </label>
              </div>
              {verificationErrors.privacyAccepted && <p className="text-error text-sm">{verificationErrors.privacyAccepted.message}</p>}
              <div className="card bg-light-green p-4">
                <h3 className="font-bold mb-2">Revisión final</h3>
                <p className="text-sm">Tu registro será revisado por nuestro equipo. Te notificaremos en un plazo máximo de 48 horas.</p>
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button type="button" className="btn-secondary" onClick={() => setStep(3)}>{t('previous')}</button>
              <button type="submit" className="btn-primary">{t('submit')}</button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default DriverRegistration