import React, { useState, useEffect } from 'react';

const KeyMonitor = () => {
  const [keysPressed, setKeysPressed] = useState<Record<string, boolean>>({});

  const keyMapMac: Record<string, string> = {
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Meta: '⌘(cmd)',
    Alt: '⌥(opt)',
    Shift: '⇧(shift)',
    Control: '⌃(ctrl)',
  };

  const keyMapWin: Record<string, string> = {
    ArrowUp: '↑',
    ArrowDown: '↓',
    ArrowLeft: '←',
    ArrowRight: '→',
    Meta: '⊞(win)',
    Alt: 'alt',
  };

  // キーが押されたときと離されたときのイベントハンドラを設定
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      setKeysPressed(prevKeys => ({ ...prevKeys, [key]: true }));
    };
    const upHandler = ({ key }: KeyboardEvent) => {
      setKeysPressed(prevKeys => ({ ...prevKeys, [key]: false }));
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  // キー押下状態を表示
  return (
    <div>
      {Object.entries(keysPressed).map(([key, isPressed]) =>
        isPressed ? <p>{keyMapMac[key] ?? key} is pressed</p> : null
      )}
    </div>
  );
};

export default KeyMonitor;
