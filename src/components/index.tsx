import dynamic from "next/dynamic";

const UserHeader = dynamic(() => import("./Layout/user-header/userHeader"));
const Header = dynamic(() => import("./Layout/header/Header"));
const Footer = dynamic(() => import("./Layout/footer/Footer"));
const TextEditor = dynamic(() => import("./formatting/TextEditor/TextEditor"));
const Template = dynamic(() => import("./formatting/Template/template"));
const Rearrange = dynamic(() => import("./formatting/rearrange/rearrange"));
const DndContext = dynamic(() => import("./formatting/drag-and-drop/DndContext"));
const DndExample = dynamic(() => import("./formatting/drag-and-drop/DndExample"));
const ImproveText = dynamic(() => import("./formatting/improveText/improveText"));
const NewSection = dynamic(() => import("./formatting/NewSection/NewSection"));
const ResumePreview = dynamic(() => import("./formatting/ResumePreview/ResumePreview"));
const AutoPlaySlider = dynamic(() => import("./slider/AutoPlaySlider"));
const AutoScrollSlider = dynamic(() => import("./slider/AutoScrollSlider"));
const Ads = dynamic(() => import("./ads/Ads"));
const mainBanner = dynamic(() => import("./Banner/mainBanner"));
const Clients = dynamic(() => import("./clients/Clients"));
const faq = dynamic(() => import("./Faq/faq"));
const facebookLogin = dynamic(() => import("./socialLogins/facebookLogin"));
const googleLogin = dynamic(() => import("./socialLogins/googleLogin"));
const linkedinLogin = dynamic(() => import("./socialLogins/linkedInLogin"));
const Reviews = dynamic(() => import("./reviews/Reviews"));
const CustomButton = dynamic(() => import("./common/button/CustomButton"));
const FlipCard = dynamic(() => import("./common/card/flipCard/FlipCard"));
const CustomAlert = dynamic(() => import("./common/customAlerts/CustomAlert"));
const CustomPhoneNumber = dynamic(() => import("./common/customSelect/CustomPhoneNumber"));
const CustomSelect = dynamic(() => import("./common/customSelect/CustomSelect"));
const TextArea = dynamic(() => import("./common/customSelect/TextArea"));
const SpinnerLoader = dynamic(() => import("./common/loader/SpinnerLoader"));
const Search = dynamic(() => import("./common/search/Search"));
const CustomModal = dynamic(() => import("./common/modal/customModal"));
const Switch = dynamic(() => import("./common/switch/switch"));
const MultiInputField = dynamic(() => import("./common/multiInputField/MultiInputField"));
const CustomInputField = dynamic(() => import("./common/inpufield/CustomInputField"));
const Carousel = dynamic(() => import("./common/carousel/Carousel"));
const OnScrollAnimeCard = dynamic(() => import("./common/card/OnScrollAnimeCard"));
const ReviewCard = dynamic(() => import("./common/card/ReviewCard"));
const ServiceCard = dynamic(() => import("./common/card/ServiceCard"));
const PackageCard = dynamic(() => import("./common/card/packageCard/PackageCard"));
const PosterBanner = dynamic(() => import("./services/PosterBanner"));
const UserReferral = dynamic(() => import("./userReferral/UserReferral"));
const ServiceContent = dynamic(() => import("./services/ServiceContent"));
const Services = dynamic(() => import("./services/Services"));
const ServicesSection = dynamic(() => import("./services/ServicesSection"));
const profileSection = dynamic(() => import("./profile/profileSection/profileSection"));
const loadingSkeleton = dynamic(() => import("./loadingSkeleton/loadingSkeleton"));
const AllSections = dynamic(() => import("./formatting/all-sections/AllSections"));

export {
  CustomAlert,
  CustomSelect,
  CustomPhoneNumber,
  TextArea,
  Switch,
  Search,
  MultiInputField,
  CustomInputField,
  CustomModal,
  SpinnerLoader,
  OnScrollAnimeCard,
  Carousel,
  ServiceCard,
  PackageCard,
  ReviewCard,
  AutoPlaySlider,
  AutoScrollSlider,
  TextEditor,
  NewSection,
  ResumePreview,
  Ads,
  mainBanner,
  Clients,
  faq,
  loadingSkeleton,
  profileSection,
  Reviews,
  PosterBanner,
  ServiceContent,
  Services,
  FlipCard,
  ServicesSection,
  facebookLogin,
  googleLogin,
  linkedinLogin,
  UserReferral,
  CustomButton,
  Template,
  Rearrange,
  DndContext,
  DndExample,
  ImproveText,
  AllSections,
  UserHeader,
  Header,
  Footer
}