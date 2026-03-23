import React, { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, ArrowUp, CalendarDays, Droplets, Plus, Search, Trash2, Waves, FlaskConical } from "lucide-react";

const today = new Date("2026-03-23T09:00:00");
const todayStr = today.toISOString().slice(0, 10);

const groupLabels = {
  smallagave: "smallagave",
  mediumagave: "mediumagave",
  agave: "agave",
  wildagave: "wildagave",
  cactus: "cactus",
  codex: "codex",
  euphorbia: "euphorbia",
};

const initialPlants = [
  { id: 1, name: "子株", group: "smallagave", interval: 3, lastWatered: "2026-03-10", note: "seaser redform / italia noname / 海王", rule: "去年の子株3" },
  { id: 2, name: "GG compacta", group: "mediumagave", interval: 7, lastWatered: "2026-03-10", note: "ggcompacta7", rule: "7日目安" },
  { id: 3, name: "萬代厳竜", group: "mediumagave", interval: 7, lastWatered: "2026-03-10", note: "LIZE OC", rule: "7日目安" },
  { id: 4, name: "ホリダ", group: "mediumagave", interval: 7, lastWatered: "2026-03-10", note: "ホリダ7", rule: "7日目安" },
  { id: 5, name: "spawn", group: "mediumagave", interval: 5, lastWatered: "2026-03-10", note: "spawn5", rule: "5日目安" },
  { id: 6, name: "orca", group: "smallagave", interval: 2, lastWatered: "2026-03-10", note: "orca2", rule: "2日目安" },
  { id: 7, name: "ripple effect", group: "smallagave", interval: 3, lastWatered: "2026-03-10", note: "未設定だったので仮で3", rule: "仮設定" },
  { id: 8, name: "FO076", group: "smallagave", interval: 4, lastWatered: "2026-03-10", note: "FO076 4", rule: "4日目安" },
  { id: 9, name: "CJ-1", group: "smallagave", interval: 5, lastWatered: "2026-03-10", note: "ハデス", rule: "5日目安" },
  { id: 10, name: "ゴリ猫", group: "smallagave", interval: 5, lastWatered: "2026-03-10", note: "redcat系", rule: "5日目安" },
  { id: 11, name: "redcat", group: "smallagave", interval: 5, lastWatered: "2026-03-10", note: "5号", rule: "5日目安" },
  { id: 12, name: "オアハカ", group: "smallagave", interval: 3, lastWatered: "2026-03-10", note: "オアハカ3", rule: "3日目安" },
  { id: 13, name: "イタリア noname", group: "smallagave", interval: 2, lastWatered: "2026-03-10", note: "イタリアnoname2", rule: "2日目安" },
  { id: 14, name: "crab", group: "smallagave", interval: 2, lastWatered: "2026-03-10", note: "crab2", rule: "2日目安" },
  { id: 15, name: "野火", group: "smallagave", interval: 2, lastWatered: "2026-03-10", note: "野火2", rule: "2日目安" },
  { id: 16, name: "姫巌龍", group: "smallagave", interval: 2, lastWatered: "2026-03-10", note: "姫巌龍2", rule: "2日目安" },
  { id: 17, name: "yj白鯨", group: "smallagave", interval: 5, lastWatered: "2026-03-10", note: "yj白鯨5", rule: "5日目安" },
  { id: 18, name: "国産白鯨", group: "smallagave", interval: 3, lastWatered: "2026-03-10", note: "仮設定", rule: "仮設定" },
  { id: 19, name: "オアハカドワーフ", group: "smallagave", interval: 3, lastWatered: "2026-03-10", note: "仮設定", rule: "仮設定" },
  { id: 20, name: "斑入りアガベ", group: "smallagave", interval: 5, lastWatered: "2026-03-10", note: "斑入りアガベ5", rule: "5日目安" },
  { id: 21, name: "ディッキア", group: "wildagave", interval: 20, lastWatered: "2026-03-10", note: "ディッキア20", rule: "20日目安" },
  { id: 22, name: "フェロシオール", group: "cactus", interval: 30, lastWatered: "2026-03-10", note: "フェロシオール30", rule: "30日目安" },
  { id: 23, name: "金鯱", group: "cactus", interval: 30, lastWatered: "2026-03-10", note: "金鯱30", rule: "30日目安" },
  { id: 24, name: "守金魔天竜", group: "cactus", interval: 30, lastWatered: "2026-03-10", note: "守金魔天竜30", rule: "30日目安" },
  { id: 25, name: "ペクチニフェラ", group: "agave", interval: 30, lastWatered: "2026-03-10", note: "ペクチニフェラ30", rule: "30日目安" },
  { id: 26, name: "ロフォフォラ", group: "cactus", interval: 14, lastWatered: "2026-03-10", note: "ロフォフォラ", rule: "14日仮" },
  { id: 27, name: "疣銀冠", group: "cactus", interval: 14, lastWatered: "2026-03-10", note: "疣銀冠", rule: "14日仮" },
  { id: 28, name: "オベサ", group: "euphorbia", interval: 14, lastWatered: "2026-03-10", note: "オベサ夏14", rule: "14日目安" },
  { id: 29, name: "hyoronaga", group: "cactus", interval: 30, lastWatered: "2026-03-10", note: "hyoronaga30", rule: "30日目安" },
  { id: 30, name: "センナ", group: "codex", interval: 3, lastWatered: "2026-03-10", note: "センナ", rule: "3日仮" },
  { id: 31, name: "二ノ宮グラキリス", group: "codex", interval: 7, lastWatered: "2026-03-10", note: "5.13〜の実績", rule: "7日仮" },
  { id: 32, name: "グラキリス", group: "codex", interval: 7, lastWatered: "2026-03-10", note: "4.25開始", rule: "7日仮" },
  { id: 33, name: "ブーファンディスティカ", group: "codex", interval: 20, lastWatered: "2026-03-10", note: "20", rule: "20日目安" },
  { id: 34, name: "二ノ宮ブーファンディスティカ", group: "codex", interval: 20, lastWatered: "2026-03-10", note: "20", rule: "20日目安" },
  { id: 35, name: "princspis", group: "codex", interval: 20, lastWatered: "2026-03-10", note: "20", rule: "20日目安" },
  { id: 36, name: "恵比寿", group: "agave", interval: 10, lastWatered: "2026-03-10", note: "恵比寿10", rule: "10日目安" },
  { id: 37, name: "foetida", group: "agave", interval: 10, lastWatered: "2026-03-10", note: "foetida", rule: "10日仮" },
  { id: 38, name: "亀甲竜", group: "codex", interval: 10, lastWatered: "2026-03-10", note: "亀甲竜", rule: "10日仮" },
  { id: 39, name: "イネルミス", group: "cactus", interval: 10, lastWatered: "2026-03-10", note: "イネルミス10", rule: "10日目安" },
  { id: 40, name: "エノプラ", group: "cactus", interval: 10, lastWatered: "2026-03-10", note: "エノプラ10", rule: "10日目安" },
  { id: 41, name: "ホリダブルースノー", group: "mediumagave", interval: 20, lastWatered: "2026-03-10", note: "20", rule: "20日目安" },
];

const initialLogs = [
  { id: 1, date: "2026-03-10", plantId: 1, type: "水", memo: "" },
  { id: 2, date: "2026-03-10", plantId: 7, type: "水", memo: "" },
  { id: 3, date: "2026-03-10", plantId: 8, type: "水", memo: "" },
  { id: 4, date: "2026-03-10", plantId: 9, type: "水", memo: "" },
  { id: 5, date: "2026-03-10", plantId: 10, type: "HB", memo: "" },
];

function daysBetween(a, b) {
  const ms = 1000 * 60 * 60 * 24;
  const d1 = new Date(a);
  const d2 = new Date(b);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  return Math.floor((d2 - d1) / ms);
}

function addDays(dateStr, days) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function statusForPlant(plant) {
  const elapsed = daysBetween(plant.lastWatered, today);
  const dueIn = plant.interval - elapsed;
  if (dueIn <= 0) return { label: "今日やる", tone: "destructive", elapsed, dueIn };
  if (dueIn === 1) return { label: "明日目安", tone: "secondary", elapsed, dueIn };
  return { label: "待機", tone: "outline", elapsed, dueIn };
}

function toneClass(tone) {
  if (tone === "destructive") return "bg-red-100 text-red-700 border-red-200";
  if (tone === "secondary") return "bg-amber-100 text-amber-700 border-amber-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default function AgaveWateringManagerApp() {
  const [plants, setPlants] = useState(initialPlants);
  const [logs, setLogs] = useState(initialLogs);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("smallagave");
  const [showDueOnly, setShowDueOnly] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [newPlant, setNewPlant] = useState({ name: "", group: "smallagave", interval: 7, note: "", rule: "" });

  const computedPlants = useMemo(() => {
    return plants.map((p) => {
      const st = statusForPlant(p);
      return {
        ...p,
        elapsed: st.elapsed,
        dueIn: st.dueIn,
        statusLabel: st.label,
        statusTone: st.tone,
        nextDate: addDays(p.lastWatered, p.interval),
      };
    });
  }, [plants]);

  const filteredPlants = useMemo(() => {
    return computedPlants.filter((p) => {
      const okQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.note.toLowerCase().includes(query.toLowerCase()) || p.rule.toLowerCase().includes(query.toLowerCase());
      const okGroup = group ? p.group === group : true;
      const okDue = showDueOnly ? p.dueIn <= 0 : true;
      return okQuery && okGroup && okDue;
    });
  }, [computedPlants, query, group, showDueOnly]);

  const dueToday = computedPlants.filter((p) => p.dueIn <= 0);
  const dueTomorrow = computedPlants.filter((p) => p.dueIn === 1);

  const markWateredToday = (ids, type = "水") => {
    setPlants((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, lastWatered: todayStr } : p)));
    setLogs((prev) => [
      ...ids.map((id, idx) => ({ id: Date.now() + idx, date: todayStr, plantId: id, type, memo: "" })),
      ...prev,
    ]);
    setSelectedIds([]);
  };

  const movePlant = (id, dir) => {
    const index = plants.findIndex((p) => p.id === id);
    const newIndex = dir === "up" ? index - 1 : index + 1;
    if (index < 0 || newIndex < 0 || newIndex >= plants.length) return;
    const copy = [...plants];
    const [item] = copy.splice(index, 1);
    copy.splice(newIndex, 0, item);
    setPlants(copy);
  };

  const addPlant = () => {
    if (!newPlant.name.trim()) return;
    setPlants((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newPlant.name.trim(),
        group: newPlant.group,
        interval: Number(newPlant.interval) || 7,
        lastWatered: todayStr,
        note: newPlant.note.trim(),
        rule: newPlant.rule.trim(),
      },
    ]);
    setNewPlant({ name: "", group: "smallagave", interval: 7, note: "", rule: "" });
  };

  const deletePlant = (id) => {
    setPlants((prev) => prev.filter((p) => p.id !== id));
    setSelectedIds((prev) => prev.filter((x) => x !== id));
  };

  const toggleSelected = (id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const groupedToday = Object.keys(groupLabels).map((key) => ({ key, items: dueToday.filter((p) => p.group === key) })).filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-slate-50 p-3 md:p-6">
      <div className="mx-auto max-w-6xl space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">植物管理アプリ</h1>
            <p className="text-sm text-slate-600">今の空き日数ルール・株名・グループを反映したiPhone向け大きめUI。</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium"><CalendarDays className="h-4 w-4" />判定日 {todayStr}</div>
          </div>
        </div>

        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          <Card className="rounded-2xl shadow-sm"><CardContent className="p-4"><div className="text-xs text-slate-500">今日やる株</div><div className="text-3xl font-bold">{dueToday.length}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm"><CardContent className="p-4"><div className="text-xs text-slate-500">明日目安</div><div className="text-3xl font-bold">{dueTomorrow.length}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm"><CardContent className="p-4"><div className="text-xs text-slate-500">登録株</div><div className="text-3xl font-bold">{plants.length}</div></CardContent></Card>
          <Card className="rounded-2xl shadow-sm"><CardContent className="p-4"><div className="text-xs text-slate-500">選択中</div><div className="text-3xl font-bold">{selectedIds.length}</div></CardContent></Card>
        </div>

        <Tabs defaultValue="today" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 rounded-2xl bg-white shadow-sm h-14">
            <TabsTrigger value="today" className="text-base">今日の管理</TabsTrigger>
            <TabsTrigger value="plants" className="text-base">植物一覧</TabsTrigger>
            <TabsTrigger value="groups" className="text-base">グループ</TabsTrigger>
            <TabsTrigger value="logs" className="text-base">履歴</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>今日やる株</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
                  <Button size="lg" className="rounded-2xl h-14 text-base" onClick={() => markWateredToday(dueToday.map((p) => p.id), "水")}><Droplets className="mr-2 h-5 w-5" />今日の候補をまとめて水</Button>
                  <Button size="lg" variant="outline" className="rounded-2xl h-14 text-base" onClick={() => markWateredToday(dueToday.map((p) => p.id), "HB")}><Waves className="mr-2 h-5 w-5" />今日の候補をHB</Button>
                  <Button size="lg" variant="outline" className="rounded-2xl h-14 text-base" onClick={() => markWateredToday(dueToday.map((p) => p.id), "RD")}><FlaskConical className="mr-2 h-5 w-5" />今日の候補をRD</Button>
                </div>
                {groupedToday.length === 0 ? <div className="rounded-2xl border border-dashed p-6 text-sm text-slate-500">今日は水やり候補なし。</div> : (
                  <div className="space-y-5">
                    {groupedToday.map((g) => (
                      <div key={g.key} className="space-y-2">
                        <div className="text-sm font-semibold text-slate-700">{groupLabels[g.key]}</div>
                        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                          {g.items.map((p) => (
                            <Card key={p.id} className="rounded-2xl border-slate-200 shadow-sm">
                              <CardContent className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                  <div>
                                    <div className="font-semibold text-base">{p.name}</div>
                                    <div className="text-xs text-slate-500">{p.rule}</div>
                                  </div>
                                  <Badge className={toneClass(p.statusTone)}>{p.statusLabel}</Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                  <div className="rounded-xl bg-slate-100 p-3">前回<br /><span className="font-semibold">{p.lastWatered}</span></div>
                                  <div className="rounded-xl bg-slate-100 p-3">経過<br /><span className="font-semibold">{p.elapsed}日</span></div>
                                  <div className="rounded-xl bg-slate-100 p-3">今の空き日数<br /><span className="font-semibold">{p.interval}日</span></div>
                                  <div className="rounded-xl bg-slate-100 p-3">次回目安<br /><span className="font-semibold">{p.nextDate}</span></div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                  <Button className="rounded-xl h-12 text-base" onClick={() => markWateredToday([p.id], "水")}>水</Button>
                                  <Button variant="outline" className="rounded-xl h-12 text-base" onClick={() => markWateredToday([p.id], "HB")}>HB</Button>
                                  <Button variant="outline" className="rounded-xl h-12 text-base" onClick={() => markWateredToday([p.id], "RD")}>RD</Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plants" className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>植物一覧</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[1fr_220px_180px_auto]">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input className="rounded-2xl pl-9 h-12 text-base" placeholder="株名・ルール・メモ検索" value={query} onChange={(e) => setQuery(e.target.value)} />
                  </div>
                  <Select value={group} onValueChange={setGroup}>
                    <SelectTrigger className="rounded-2xl h-12 text-base"><SelectValue /></SelectTrigger>
                    <SelectContent>{Object.entries(groupLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                  </Select>
                  <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 h-12">
                    <Checkbox checked={showDueOnly} onCheckedChange={(v) => setShowDueOnly(Boolean(v))} />
                    <span className="text-sm">今日候補のみ</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild><Button className="rounded-2xl h-12 text-base"><Plus className="mr-2 h-4 w-4" />追加</Button></DialogTrigger>
                    <DialogContent className="rounded-2xl">
                      <DialogHeader><DialogTitle>植物追加</DialogTitle></DialogHeader>
                      <div className="space-y-3">
                        <div><Label>株名</Label><Input className="rounded-xl" value={newPlant.name} onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })} /></div>
                        <div><Label>グループ</Label><Select value={newPlant.group} onValueChange={(v) => setNewPlant({ ...newPlant, group: v })}><SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger><SelectContent>{Object.entries(groupLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent></Select></div>
                        <div><Label>今の空き日数</Label><Input className="rounded-xl" type="number" value={newPlant.interval} onChange={(e) => setNewPlant({ ...newPlant, interval: Number(e.target.value) })} /></div>
                        <div><Label>ルールメモ</Label><Input className="rounded-xl" value={newPlant.rule} onChange={(e) => setNewPlant({ ...newPlant, rule: e.target.value })} /></div>
                        <div><Label>補足メモ</Label><Textarea className="rounded-xl" value={newPlant.note} onChange={(e) => setNewPlant({ ...newPlant, note: e.target.value })} /></div>
                        <Button className="w-full rounded-xl" onClick={addPlant}>追加する</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {selectedIds.length > 0 && (
                  <div className="grid gap-2 md:grid-cols-4 rounded-2xl bg-slate-100 p-3">
                    <Button className="rounded-2xl h-12 text-base" onClick={() => markWateredToday(selectedIds, "水")}>選択株に水</Button>
                    <Button variant="outline" className="rounded-2xl h-12 text-base" onClick={() => markWateredToday(selectedIds, "HB")}>選択株にHB</Button>
                    <Button variant="outline" className="rounded-2xl h-12 text-base" onClick={() => markWateredToday(selectedIds, "RD")}>選択株にRD</Button>
                    <div className="self-center text-sm text-slate-600">{selectedIds.length}株選択中</div>
                  </div>
                )}

                <div className="space-y-3">
                  {filteredPlants.map((p) => (
                    <Card key={p.id} className="rounded-2xl border-slate-200 shadow-sm">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox checked={selectedIds.includes(p.id)} onCheckedChange={() => toggleSelected(p.id)} className="mt-1" />
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-base">{p.name}</span>
                              <Badge variant="outline">{groupLabels[p.group]}</Badge>
                              <Badge className={toneClass(p.statusTone)}>{p.statusLabel}</Badge>
                            </div>
                            <div className="text-sm text-slate-600">{p.rule}</div>
                            {p.note && <div className="text-sm text-slate-500">{p.note}</div>}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                              <div className="rounded-xl bg-slate-100 p-3">前回<br /><span className="font-semibold">{p.lastWatered}</span></div>
                              <div className="rounded-xl bg-slate-100 p-3">経過<br /><span className="font-semibold">{p.elapsed}日</span></div>
                              <div className="rounded-xl bg-slate-100 p-3">今の空き日数<br /><Input className="mt-2 rounded-xl h-10" type="number" value={p.interval} onChange={(e) => setPlants((prev) => prev.map((x) => x.id === p.id ? { ...x, interval: Number(e.target.value) || 0 } : x))} /></div>
                              <div className="rounded-xl bg-slate-100 p-3">次回目安<br /><span className="font-semibold">{p.nextDate}</span></div>
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                              <Button variant="outline" className="rounded-xl h-12" onClick={() => movePlant(p.id, "up")}><ArrowUp className="h-4 w-4" /></Button>
                              <Button variant="outline" className="rounded-xl h-12" onClick={() => movePlant(p.id, "down")}><ArrowDown className="h-4 w-4" /></Button>
                              <Select value={p.group} onValueChange={(v) => setPlants((prev) => prev.map((x) => x.id === p.id ? { ...x, group: v } : x))}>
                                <SelectTrigger className="rounded-xl h-12"><SelectValue /></SelectTrigger>
                                <SelectContent>{Object.entries(groupLabels).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                              </Select>
                              <Button className="rounded-xl h-12" onClick={() => markWateredToday([p.id], "水")}>水</Button>
                              <Button variant="outline" className="rounded-xl h-12" onClick={() => deletePlant(p.id)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="groups" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {Object.entries(groupLabels).map(([key, label]) => {
                const items = computedPlants.filter((p) => p.group === key);
                return (
                  <Card key={key} className="rounded-2xl shadow-sm">
                    <CardHeader><CardTitle className="flex items-center justify-between"><span>{label}</span><Badge variant="outline">{items.length}株</Badge></CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      {items.map((p) => (
                        <div key={p.id} className="flex items-center justify-between rounded-xl bg-slate-100 px-3 py-3 text-sm">
                          <span>{p.name}</span>
                          <Badge className={toneClass(p.statusTone)}>{p.statusLabel}</Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-4">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader><CardTitle>履歴</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {logs.map((log) => {
                  const plant = plants.find((p) => p.id === log.plantId);
                  return (
                    <div key={log.id} className="flex items-center justify-between rounded-xl border px-3 py-3 text-sm">
                      <div>
                        <div className="font-medium">{plant?.name || "不明な株"}</div>
                        <div className="text-slate-500">{log.date}</div>
                      </div>
                      <Badge variant="outline">{log.type}</Badge>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
