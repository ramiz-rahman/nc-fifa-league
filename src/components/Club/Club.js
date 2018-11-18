import React from 'react';
import ac_milan from '../../assets/logo/ac_milan.png';
import arsenal from '../../assets/logo/arsenal.png';
import athletico from '../../assets/logo/athletico.png';
import barcelona from '../../assets/logo/barcelona.png';
import bayern from '../../assets/logo/bayern.png';
import chelsea from '../../assets/logo/chelsea.png';
import dortmund from '../../assets/logo/dortmund.png';
import inter_milan from '../../assets/logo/inter_milan.png';
import juventus from '../../assets/logo/juventus.png';
import liverpool from '../../assets/logo/liverpool.png';
import lyon from '../../assets/logo/lyon.png';
import man_city from '../../assets/logo/man_city.png';
import man_utd from '../../assets/logo/man_utd.png';
import monaco from '../../assets/logo/monaco.png';
import napoli from '../../assets/logo/napoli.png';
import psg from '../../assets/logo/psg.png';
import real_madrid from '../../assets/logo/real_madrid.png';
import roma from '../../assets/logo/roma.png';
import sevilla from '../../assets/logo/sevilla.png';
import tottenham from '../../assets/logo/tottenham.png';

import classes from './Club.module.css';

const clubLogo = {
  'AC Milan': ac_milan,
  Arsenal: arsenal,
  'AS Roma': roma,
  'Athletico Madrid': athletico,
  Barcelona: barcelona,
  'Bayern Munich': bayern,
  Chelsea: chelsea,
  Dortmund: dortmund,
  'Inter Milan': inter_milan,
  Juventus: juventus,
  Liverpool: liverpool,
  Lyon: lyon,
  'Manchester City': man_city,
  'Manchester United': man_utd,
  Monaco: monaco,
  Napoli: napoli,
  PSG: psg,
  'Real Madrid': real_madrid,
  Sevilla: sevilla,
  Tottenham: tottenham
};

const club = props => {
  return (
    <span className={classes.Club}>
      <img src={clubLogo[props.name]} alt="Logo of the club" />
      {props.name}
    </span>
  );
};

export default club;
