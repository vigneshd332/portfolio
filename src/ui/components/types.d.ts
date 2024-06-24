interface Icon {
  icon: string;
  url: string;
}

interface CardData {
  img: string;
  title: string;
  text: string;
  websites: Icon[];
}

interface ControlProps {
  gameStart: boolean;
  hudData: HUDData;
}

interface HUDData {
  name: string;
  speed: number;
  altitude: number;
  roll: number;
}
