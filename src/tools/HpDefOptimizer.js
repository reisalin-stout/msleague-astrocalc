import React, { useState } from "react";
import SpreadDisplay from "../components/SpreadDisplay";
import EHPDisplay from "../components/EHPDisplay";

const EHP_Calculator = () => {
  const [bHP, setBHP] = useState(0);
  const [bDEF, setBDEF] = useState(0);
  const [fHP, setFHP] = useState(14500);
  const [fDEF, setFDEF] = useState(1400);
  const [useSA, setUseSA] = useState(false);
  const [useDefault, setUseDefault] = useState(true);
  const [useDefaultPercent, setUseDefaultPercent] = useState(true);
  const [pct, setPct] = useState(244);
  const [result, setResult] = useState("");
  const [ehp, setEHP] = useState(0);

  const calculate = () => {
    let max = 0;
    const log = {
      HP: 0,
      DEF: 0,
    };

    const fHPValue = useDefault ? 14500 : fHP;
    const fDEFValue = useDefault ? 1400 : fDEF;
    const pctValue = useDefaultPercent ? 244 : pct;
    const SA = useSA ? 1.0666 : 1;

    for (let a = 0; a < pctValue; a++) {
      const HP = fHPValue + (SA * bHP * (100 + a)) / 100;
      const DEF = fDEFValue + (SA * bDEF * (100 + (pctValue - a))) / 100;

      const eHPValue = HP / (1 - DEF / (DEF + 1200));
      if (eHPValue > max) {
        max = eHPValue;
        log.HP = a;
        log.DEF = pctValue - a;
      }
    }

    setResult(`HP% = ${log.HP} - DEF% = ${log.DEF}`);
    setEHP(max);
  };

  // Effect to update results whenever inputs change
  React.useEffect(() => {
    calculate();
  }, [bHP, bDEF, fHP, fDEF, useSA, useDefault, useDefaultPercent, pct]);

  return (
    <div>
      <label>
        baseHP:
        <input
          type="number"
          value={bHP}
          onChange={(e) => setBHP(Number(e.target.value))}
        />
      </label>
      <label>
        baseDEF:
        <input
          type="number"
          value={bDEF}
          onChange={(e) => setBDEF(Number(e.target.value))}
        />
      </label>
      <label>
        Add SA:
        <input
          type="checkbox"
          checked={useSA}
          onChange={(e) => setUseSA(e.target.checked)}
        />
      </label>
      <br />
      <label>
        flatHP:
        <input
          type="number"
          value={fHP}
          onChange={(e) => setFHP(Number(e.target.value))}
          placeholder="Default = 14500"
        />
      </label>
      <label>
        flatDEF:
        <input
          type="number"
          value={fDEF}
          onChange={(e) => setFDEF(Number(e.target.value))}
          placeholder="Default = 1400"
        />
        (Default
        <input
          type="checkbox"
          checked={useDefault}
          onChange={(e) => setUseDefault(e.target.checked)}
        />
        )
      </label>
      <br />
      <label>
        total%:
        <input
          type="number"
          value={pct}
          onChange={(e) => setPct(Number(e.target.value))}
          placeholder="Default = 244%"
        />
        (Default
        <input
          type="checkbox"
          checked={useDefaultPercent}
          onChange={(e) => setUseDefaultPercent(e.target.checked)}
        />
        )
      </label>
      <br />
      <SpreadDisplay result={result} />
      <EHPDisplay ehp={ehp} />
    </div>
  );
};

export default EHP_Calculator;
