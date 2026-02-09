// src/components/InstallButton.tsx
import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { t } from "@/lib/translations";

const InstallButton = () => {
  const { language } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      setIsInstallable(false);
      return;
    }

    // For iOS, check if user can install (not already on homescreen)
    if (iOS) {
      setIsInstallable(true);
    }

    // For Chrome/Android - capture beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      // Show iOS instructions
      setShowIOSInstructions(true);
    } else if (deferredPrompt) {
      // Trigger Chrome/Android install prompt
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('User installed the app');
      }

      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  if (!isInstallable) return null;

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-primary-foreground transition-colors"
      >
        <Download className="w-4 h-4" />
        {t("install_app", language)}
      </button>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"
          onClick={() => setShowIOSInstructions(false)}
        >
          <div 
            className="bg-background rounded-lg max-w-sm w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowIOSInstructions(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-medium mb-4">
              {language === "en" && "Install ADUmedia"}
              {language === "es" && "Instalar ADUmedia"}
              {language === "fr" && "Installer ADUmedia"}
              {language === "pt-br" && "Instalar ADUmedia"}
              {language === "ru" && "Установить ADUmedia"}
            </h3>

            <div className="space-y-3 text-base">
              <p>
                {language === "en" && "To install this app on your iPhone or iPad:"}
                {language === "es" && "Para instalar esta aplicación en tu iPhone o iPad:"}
                {language === "fr" && "Pour installer cette application sur votre iPhone ou iPad :"}
                {language === "pt-br" && "Para instalar este aplicativo no seu iPhone ou iPad:"}
                {language === "ru" && "Чтобы установить это приложение на iPhone или iPad:"}
              </p>

              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>
                  {language === "en" && (
                    <>
                      Tap the <strong>Share</strong> button in Safari
                      <span className="inline-block mx-1 px-2 py-0.5 bg-secondary rounded text-sm">
                        <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                      </span>
                    </>
                  )}
                  {language === "es" && (
                    <>
                      Toca el botón <strong>Compartir</strong> en Safari
                    </>
                  )}
                  {language === "fr" && (
                    <>
                      Appuyez sur le bouton <strong>Partager</strong> dans Safari
                    </>
                  )}
                  {language === "pt-br" && (
                    <>
                      Toque no botão <strong>Compartilhar</strong> no Safari
                    </>
                  )}
                  {language === "ru" && (
                    <>
                      Нажмите кнопку <strong>Поделиться</strong> в Safari
                    </>
                  )}
                </li>
                <li>
                  {language === "en" && (
                    <>Scroll down and tap <strong>"Add to Home Screen"</strong></>
                  )}
                  {language === "es" && (
                    <>Desplázate hacia abajo y toca <strong>"Añadir a pantalla de inicio"</strong></>
                  )}
                  {language === "fr" && (
                    <>Faites défiler vers le bas et appuyez sur <strong>"Sur l'écran d'accueil"</strong></>
                  )}
                  {language === "pt-br" && (
                    <>Role para baixo e toque em <strong>"Adicionar à Tela de Início"</strong></>
                  )}
                  {language === "ru" && (
                    <>Прокрутите вниз и нажмите <strong>"На экран «Домой»"</strong></>
                  )}
                </li>
                <li>
                  {language === "en" && (
                    <>Tap <strong>"Add"</strong> to confirm</>
                  )}
                  {language === "es" && (
                    <>Toca <strong>"Añadir"</strong> para confirmar</>
                  )}
                  {language === "fr" && (
                    <>Appuyez sur <strong>"Ajouter"</strong> pour confirmer</>
                  )}
                  {language === "pt-br" && (
                    <>Toque em <strong>"Adicionar"</strong> para confirmar</>
                  )}
                  {language === "ru" && (
                    <>Нажмите <strong>"Добавить"</strong> для подтверждения</>
                  )}
                </li>
              </ol>

              <p className="text-sm italic pt-2">
                {language === "en" && "The app icon will appear on your home screen and you can launch it like any other app."}
                {language === "es" && "El icono de la aplicación aparecerá en tu pantalla de inicio y podrás abrirla como cualquier otra aplicación."}
                {language === "fr" && "L'icône de l'application apparaîtra sur votre écran d'accueil et vous pourrez la lancer comme n'importe quelle autre application."}
                {language === "pt-br" && "O ícone do aplicativo aparecerá na sua tela inicial e você poderá iniciá-lo como qualquer outro aplicativo."}
                {language === "ru" && "Значок приложения появится на главном экране, и вы сможете запускать его как любое другое приложение."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InstallButton;