import { Dialog, Transition } from '@headlessui/react'
import { Fragment, Dispatch } from 'react'

interface IModal {
  title?: string
  description?: string
  children: JSX.Element
  isOpen: boolean
  setIsOpen: Dispatch<boolean>
  dismiss?: () => void
}

const Modal = ({
  children,
  description,
  isOpen,
  title,
  setIsOpen,
  dismiss
}: IModal) => {
  function closeModal() {
    setIsOpen(false)
    dismiss && dismiss()
  }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-layer bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 mt-14 overflow-y-auto">
          <div className="flex min-h-full items-start justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="primary bg-bg max-w-[380px] transform overflow-hidden rounded-2xl border border-white border-[rgba(255,255,255,0.1)] border-opacity-60 bg-layer p-8 text-left align-middle shadow-xl transition-all">
                <div className="mb-5 flex items-center text-white">
                  <div className="flex flex-col items-center space-x-3 md:space-x-6">
                    {title ? (
                      <Dialog.Title
                        as="h3"
                        className="mt-4 text-center text-[28px] font-bold leading-[32px] text-white md:mt-0"
                      >
                        {title}
                      </Dialog.Title>
                    ) : null}
                    {description ? (
                      <Dialog.Description
                        as="p"
                        className="mt-4 mb-8 text-center font-bold text-white text-opacity-60"
                      >
                        {description}
                      </Dialog.Description>
                    ) : null}
                  </div>
                </div>
                <div className="text-white">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
