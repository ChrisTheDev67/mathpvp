import React from 'react';
import {
    VaultScene, VaultSuccessScene, VaultFailScene,
    EquipScene, EquipWrongScene,
    HackScene, HackFailScene,
    StealthScene, StealthFailScene,
    CodeScene, EscapeScene,
    CaughtScene, GrabMoneyScene,
    GrabItemScene, HackSuccessScene, StealthSuccessScene, CodeSuccessScene,
    AdventureIntroScene, AdventureShopScene, AdventureBattleScene
} from './ComicScenes';

export const VaultSceneMemo = React.memo(VaultScene);
export const VaultSuccessSceneMemo = React.memo(VaultSuccessScene);
export const VaultFailSceneMemo = React.memo(VaultFailScene);
export const EquipSceneMemo = React.memo(EquipScene);
export const EquipWrongSceneMemo = React.memo(EquipWrongScene);
export const HackSceneMemo = React.memo(HackScene);
export const HackFailSceneMemo = React.memo(HackFailScene);
export const StealthSceneMemo = React.memo(StealthScene);
export const StealthFailSceneMemo = React.memo(StealthFailScene);
export const CodeSceneMemo = React.memo(CodeScene);
export const EscapeSceneMemo = React.memo(EscapeScene);
export const CaughtSceneMemo = React.memo(CaughtScene);
export const GrabMoneySceneMemo = React.memo(GrabMoneyScene);

// New animations
export const GrabItemSceneMemo = React.memo(GrabItemScene);
export const HackSuccessSceneMemo = React.memo(HackSuccessScene);
export const StealthSuccessSceneMemo = React.memo(StealthSuccessScene);
export const CodeSuccessSceneMemo = React.memo(CodeSuccessScene);

// Adventure Scenes
export const AdventureIntroSceneMemo = React.memo(AdventureIntroScene);
export const AdventureShopSceneMemo = React.memo(AdventureShopScene);
export const AdventureBattleSceneMemo = React.memo(AdventureBattleScene);

// Export with original names to maintain compatibility
export {
    VaultSceneMemo as VaultScene,
    VaultSuccessSceneMemo as VaultSuccessScene,
    VaultFailSceneMemo as VaultFailScene,
    EquipSceneMemo as EquipScene,
    EquipWrongSceneMemo as EquipWrongScene,
    HackSceneMemo as HackScene,
    HackFailSceneMemo as HackFailScene,
    StealthSceneMemo as StealthScene,
    StealthFailSceneMemo as StealthFailScene,
    CodeSceneMemo as CodeScene,
    EscapeSceneMemo as EscapeScene,
    CaughtSceneMemo as CaughtScene,
    GrabMoneySceneMemo as GrabMoneyScene,
    GrabItemSceneMemo as GrabItemScene,
    HackSuccessSceneMemo as HackSuccessScene,
    StealthSuccessSceneMemo as StealthSuccessScene,
    CodeSuccessSceneMemo as CodeSuccessScene,
    AdventureIntroSceneMemo as AdventureIntroScene,
    AdventureShopSceneMemo as AdventureShopScene,
    AdventureBattleSceneMemo as AdventureBattleScene
};
