import {useDisclosure} from "@chakra-ui/react";
import {useI18n} from "@/app/i18n/I18nProvider";

export const useHeader = () => {
  const { changeLanguage } = useI18n()
  const languageDropdownDisclosure = useDisclosure();
  const mobileMenuDisclosure = useDisclosure();

  const handleLngOptionClick = async (value: string) => {
    await changeLanguage(value);
    languageDropdownDisclosure.onClose();
  };

  return {
    languageDropdownDisclosure,
    mobileMenuDisclosure,
    handleLngOptionClick,
  }
}
