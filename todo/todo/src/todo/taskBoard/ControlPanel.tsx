function ControlPanel() {
  return (
    <div className="flex flex-row justify-between items-center gap-2 p-2 rounded-lg">
      <button>menu</button>
      <div className="flex flex-row justify-center items-center gap-2">
        <input type="text" placeholder="Ctrl + K" />
        <button>〇</button>
      </div>
      <div></div>
    </div>
  );
}

export { ControlPanel };
