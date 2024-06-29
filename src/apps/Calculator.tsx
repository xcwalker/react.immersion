import Window from "../components/Window";
import css from "../styles/apps/calculator.module.css";

export default function CalculatorApp(props: { uuid: string }) {
  return (
    <Window
      uuid={props.uuid}
      name="Calculator"
      containerClassName={css.container}
      sizing={{ min: { width: "350px", height: "500px" } }}
    >
      
      <div className={css.display}>
        <span>00000</span>
      </div>
      <div className={css.buttons}>
        <button>%</button>
        <button>CE</button>
        <button>C</button>
        <button>⌫</button>
        <button>⅟𝑥</button>
        <button>𝑥²</button>
        <button>²√𝑥</button>
        <button>÷</button>
        <button className={css.numberButton}>7</button>
        <button className={css.numberButton}>8</button>
        <button className={css.numberButton}>9</button>
        <button>×</button>
        <button className={css.numberButton}>4</button>
        <button className={css.numberButton}>5</button>
        <button className={css.numberButton}>6</button>
        <button>-</button>
        <button className={css.numberButton}>1</button>
        <button className={css.numberButton}>2</button>
        <button className={css.numberButton}>3</button>
        <button>+</button>
        <button className={css.numberButton}>±</button>
        <button className={css.numberButton}>0</button>
        <button className={css.numberButton}>.</button>
        <button className={css.equals}>=</button>
      </div>
    </Window>
  );
}
