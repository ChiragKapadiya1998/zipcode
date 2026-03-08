export interface TrailStop {
  id: number;
  name: string;
  address: string;
  image: string;
  /** Optional additional media URLs (horizontal scroll gallery) */
  images?: string[];
  unlocked: boolean;
  checkedIn: boolean;
  lat: number;
  lng: number;
  teaser: string;
}

export interface Trail {
  id: string;
  title: string;
  image: string;
  date: string;
  duration: string;
  price: string;
  hostName: string;
  hostHandle: string;
  hostAvatar: string;
  hostFollowers: string;
  hostBio: string;
  description: string;
  totalStops: number;
  totalDuration: string;
  distance: string;
  joined: number;
  rating: number;
  views: number;
  badge?: string;
  status: "live" | "past" | "hosted";
  lat: number;
  lng: number;
  color: string;
  tags: string[];
  meta: string[];
  neighborhood: string;
  vibe: string;
  bestTimeOfDay: string;
  groupFriendly: boolean;
  stops: TrailStop[];
  /** Eventbrite-sourced fields (optional) */
  capacity?: number;
  isFree?: boolean;
  numericPrice?: number;
  currency?: string;
  /** Source identifier for UI badges */
  source?: "eventbrite" | "local" | "created";
  /** Pilot trail — curated by CityUnlock team, always shown at top */
  isPilot?: boolean;
  /** City this trail belongs to */
  cityId?: string;
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  instagramFollowers: string;
  following: number;
  trailsCreated: number;
  totalViews: string;
}

// ─── Image constants ───
const IMG_COFFEE = "https://images.unsplash.com/photo-1633583960343-e258fb899aef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yfGVufDF8fHx8MTc3MjI5Njk0OXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_STREET_ART = "https://images.unsplash.com/photo-1599590650293-a944c41829e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwc3RyZWV0JTIwYXJ0JTIwbXVyYWx8ZW58MXx8fHwxNzcyMjk2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_VENICE_SKATE = "https://images.unsplash.com/photo-1689420891792-2d1788546bd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWZW5pY2UlMjBCZWFjaCUyMHNrYXRlYm9hcmR8ZW58MXx8fHwxNzcyMjk2OTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TACO = "https://images.unsplash.com/photo-1572932759899-5ad91d0f9dbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwZm9vZCUyMHRydWNrJTIwdGFjb3xlbnwxfHx8fDE3NzIyOTY5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GRIFFITH = "https://images.unsplash.com/photo-1700130093541-65b287346f00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmlmZml0aCUyME9ic2VydmF0b3J5JTIwTG9zJTIwQW5nZWxlc3xlbnwxfHx8fDE3NzIyOTY5NTB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SANTA_MONICA = "https://images.unsplash.com/photo-1655789488528-080e569bd5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYW50YSUyME1vbmljYSUyMHBpZXIlMjBzdW5zZXR8ZW58MXx8fHwxNzcyMjk2OTUxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SILVER_LAKE = "https://images.unsplash.com/photo-1575043424254-5316e2d4c5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaWx2ZXIlMjBMYWtlJTIwTG9zJTIwQW5nZWxlcyUyMG5laWdoYm9yaG9vZHxlbnwxfHx8fDE3NzIyOTY5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DTLA = "https://images.unsplash.com/photo-1609970105047-d0cbe314122d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEVExBJTIwZG93bnRvd24lMjBMb3MlMjBBbmdlbGVzJTIwc2t5bGluZXxlbnwxfHx8fDE3NzIyOTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_CANYON = "https://images.unsplash.com/photo-1646529032133-1552aa9064dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWtpbmclMjB0cmFpbCUyMGNhbnlvbiUyMENhbGlmb3JuaWF8ZW58MXx8fHwxNzcyMjk2OTUyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_VINYL = "https://images.unsplash.com/photo-1618972678065-f16fb5ed6afb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW55bCUyMHJlY29yZCUyMHN0b3JlJTIwdmludGFnZXxlbnwxfHx8fDE3NzIyOTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_YOGA = "https://images.unsplash.com/photo-1621696742627-71d53581d2e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b2dhJTIwb3V0ZG9vciUyMGJlYWNoJTIwbW9ybmluZ3xlbnwxfHx8fDE3NzIyOTY5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MELROSE = "https://images.unsplash.com/photo-1755592085936-796d41d307a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWxyb3NlJTIwQXZlbnVlJTIwc2hvcHBpbmclMjBib3V0aXF1ZXxlbnwxfHx8fDE3NzIyOTY5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GOLDEN = "https://images.unsplash.com/photo-1599597126140-b75226977d6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBob3VyJTIwcGhvdG9ncmFwaHklMjByb29mdG9wJTIwY2l0eXxlbnwxfHx8fDE3NzIyOTY5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_FITNESS = "https://images.unsplash.com/photo-1758274539089-8b2bd10eee92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZml0bmVzcyUyMHdvcmtvdXQlMjBwYXJrfGVufDF8fHx8MTc3MjI5Njk1NHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_FRIENDS = "https://images.unsplash.com/photo-1768725844937-33d18ee82972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwc29jaWFsJTIwZ2F0aGVyaW5nJTIwb3V0ZG9vciUyMHBpY25pY3xlbnwxfHx8fDE3NzIyOTY5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GALLERY = "https://images.unsplash.com/photo-1578855019520-af8101c056e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwYXJ0JTIwZ2FsbGVyeSUyMG1vZGVybnxlbnwxfHx8fDE3NzIyOTY5NTV8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_KBBQ = "https://images.unsplash.com/photo-1749880191161-a7fcab31c4e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjBCQlElMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyMjk2OTU2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_ECHO_PARK = "https://images.unsplash.com/photo-1678729465737-3480056add4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFY2hvJTIwUGFyayUyMGxha2UlMjBMb3MlMjBBbmdlbGVzfGVufDF8fHx8MTc3MjI5Njk1Nnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MALIBU = "https://images.unsplash.com/photo-1634658724251-d7fa3d7ee469?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWxpYnUlMjBiZWFjaCUyMG9jZWFuJTIwd2F2ZXN8ZW58MXx8fHwxNzcyMjk2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_ROOFTOP = "https://images.unsplash.com/photo-1758165532022-a68f291317ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwY29ja3RhaWwlMjBsb3VuZ2V8ZW58MXx8fHwxNzcyMjk2OTU3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_MATCHA = "https://images.unsplash.com/photo-1725799957338-51f677c0ffa3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGNhZmUlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcyMjk2OTU4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_JAZZ = "https://images.unsplash.com/photo-1757439160077-dd5d62a4d851?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwbGl2ZSUyMG11c2ljJTIwcGVyZm9ybWFuY2UlMjBjbHVifGVufDF8fHx8MTc3MjI5Njk1OHww&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Pilot trail image constants ───
const IMG_P_KUMQUAT = "https://images.unsplash.com/photo-1762206805990-e5243c51d6d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGNvcm5lciUyMGNvZmZlZSUyMHNob3AlMjBjb3p5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNTE3NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_FIG_MURAL = "https://images.unsplash.com/photo-1770124045974-a68bb37a0159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGljYW5vJTIwbXVyYWwlMjBjb2xvcmZ1bCUyMHN0cmVldCUyMHdhbGwlMjBhcnR8ZW58MXx8fHwxNzcyNTE3NDEwfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_AVE50 = "https://images.unsplash.com/photo-1649833619508-9a7d4134e5a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBhcnQlMjBnYWxsZXJ5JTIwY291cnR5YXJkJTIwZXhoaWJpdGlvbnxlbnwxfHx8fDE3NzI1MTc0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_HP_BOWL = "https://images.unsplash.com/photo-1669977042684-5e2bbea603d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwYm93bGluZyUyMGFsbGV5JTIwcmV0cm8lMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzI1MTc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_INTELLI = "https://images.unsplash.com/photo-1636797955936-7e493b8ba922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVjaWFsdHklMjBjb2ZmZWUlMjBwb3VyJTIwb3ZlciUyMGJhcmlzdGF8ZW58MXx8fHwxNzcyNTE3NDEyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_CONSERV = "https://images.unsplash.com/photo-1716134142788-00481f8a5885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbnNlcnZhdG9yeSUyMHJlaGVhcnNhbCUyMHJvb20lMjBwaWFub3xlbnwxfHx8fDE3NzI1MTc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_RESERVOIR = "https://images.unsplash.com/photo-1751428971895-1453463f94e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHJlc2Vydm9pciUyMGxha2UlMjBnb2xkZW4lMjBob3VyJTIwd2Fsa3xlbnwxfHx8fDE3NzI1MTc0MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_BAR_FLORES = "https://images.unsplash.com/photo-1768284952312-92a5d61bb7f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW5lJTIwYmFyJTIwY296eSUyMGV2ZW5pbmclMjBhbWJpYW5jZXxlbnwxfHx8fDE3NzI1MTc0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_COOKBOOK = "https://images.unsplash.com/photo-1730888953268-c1ff6b744ca0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBkZWxpJTIwbWFya2V0JTIwY291bnRlciUyMGNhZmV8ZW58MXx8fHwxNzcyNTE3NDEzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_EP_LAKE = "https://images.unsplash.com/photo-1727106995145-9c67493806e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFY2hvJTIwUGFyayUyMGxha2UlMjBwYWxtJTIwdHJlZXN8ZW58MXx8fHwxNzcyNTE3NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_GARDEN = "https://images.unsplash.com/photo-1631195414013-85b70ff2c180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBnYXJkZW4lMjB1cmJhbiUyMHBsb3RzJTIwdmVnZXRhYmxlc3xlbnwxfHx8fDE3NzI1MTc0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_MOHAWK = "https://images.unsplash.com/photo-1719752486404-05a6316fbf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXN0cm9wdWIlMjBjcmFmdCUyMGJlZXIlMjBpbmR1c3RyaWFsJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcyNTE3NDE0fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_BAXTER = "https://images.unsplash.com/photo-1770174080315-4ca61399540b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVlcCUyMHVyYmFuJTIwc3RyZWV0JTIwaGlsbHNpZGUlMjBTYW4lMjBGcmFuY2lzY298ZW58MXx8fHwxNzcyNTE3NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_STAIRS = "https://images.unsplash.com/photo-1766938142328-d48fca340e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaWRkZW4lMjBjb25jcmV0ZSUyMHN0YWlyd2F5JTIwaGlsbHNpZGUlMjBuZWlnaGJvcmhvb2R8ZW58MXx8fHwxNzcyNTE3NDE1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_STAIR_MURAL = "https://images.unsplash.com/photo-1761812900919-e1cd3700b8f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGdyYWZmaXRpJTIwbXVyYWwlMjBzdGFpcndheSUyMHVyYmFufGVufDF8fHx8MTc3MjUxNzQyNHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_ELYSIAN_VIEW = "https://images.unsplash.com/photo-1765898341717-ddfd5bc0e0e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwc2t5bGluZSUyMG92ZXJsb29rJTIwcGFyayUyMGhpbGx0b3B8ZW58MXx8fHwxNzcyNTE3NDE2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_KITCHEN = "https://images.unsplash.com/photo-1759675624205-9e9c6b6e0c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYnJlYWtmYXN0JTIwY2FmZSUyMG1vcm5pbmclMjBsaWdodHxlbnwxfHx8fDE3NzI1MTc0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_PERM_REC = "https://images.unsplash.com/photo-1645986052988-58547797dc4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRlcGVuZGVudCUyMHJlY29yZCUyMHN0b3JlJTIwdmlueWwlMjBiaW5zfGVufDF8fHx8MTc3MjUxNzQxN3ww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_YORK_MURAL = "https://images.unsplash.com/photo-1760264463133-069c303a6f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMG5laWdoYm9yaG9vZCUyMHN0cmVldCUyMG11cmFsJTIwcGFpbnRlZHxlbnwxfHx8fDE3NzI1MTc0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_THE_HI = "https://images.unsplash.com/photo-1608823613993-83a24c3a21a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZWlnaGJvcmhvb2QlMjBiYXIlMjBsaXZlJTIwbXVzaWMlMjB2ZW51ZSUyMHN0YWdlfGVufDF8fHx8MTc3MjUxNzQxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_HP_COVER = "https://images.unsplash.com/photo-1768172230482-26fd6923d1c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwcmVzaWRlbnRpYWwlMjBuZWlnaGJvcmhvb2QlMjBzdHJlZXR8ZW58MXx8fHwxNzcyNTE3NDIxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_SL_COVER = "https://images.unsplash.com/photo-1615434810397-68f241660900?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaWx2ZXIlMjBMYWtlJTIwbmVpZ2hib3Job29kJTIwTG9zJTIwQW5nZWxlc3xlbnwxfHx8fDE3NzI1MTc0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_ELYSIAN_COVER = "https://images.unsplash.com/photo-1689096695702-87f92d43aa7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFbHlzaWFuJTIwUGFyayUyMGhpbGxzaWRlJTIwc3RhaXJzJTIwTG9zJTIwQW5nZWxlc3xlbnwxfHx8fDE3NzI1MTc0MDl8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_P_YORK_COVER = "https://images.unsplash.com/photo-1637064071440-6e17b117d59e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3VsZXZhcmQlMjBzaG9wcyUyMGxvY2FsJTIwc3RvcmVzJTIwd2Fsa2FibGV8ZW58MXx8fHwxNzcyNTE3NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080";

// ─── Creator avatar constants ───
const AVA_SAM = "https://images.unsplash.com/photo-1674531512182-c7a0e47ae57a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGNvbmZpZGVudCUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjB3YXJtJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcxNTI1MDUxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_LORINA = "https://images.unsplash.com/photo-1589800887183-e22983ea361c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY3JlYXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzOTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_TEJAS = "https://images.unsplash.com/photo-1692571825592-f1618a10ab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHRyYXZlbCUyMGV4cGxvcmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDk5NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_AISHA = "https://images.unsplash.com/photo-1592948078640-39656341be54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGJsYWNrJTIwd29tYW4lMjBjcmVhdGl2ZSUyMHBvcnRyYWl0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxNTI1MDUyfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_KENJI = "https://images.unsplash.com/photo-1745240261519-0b988d54d098?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMG1hbiUyMHBvcnRyYWl0JTIwdHJlbmR5JTIwc3RyZWV0d2VhcnxlbnwxfHx8fDE3NzE1MjUwNTJ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_MAYA = "https://images.unsplash.com/photo-1614991921467-47941dd54582?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjB3b21hbiUyMHBvcnRyYWl0JTIwc21pbGUlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzcxNTI1MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_DARIUS = "https://images.unsplash.com/photo-1763618251924-473fc241972d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGRyZWFkbG9ja3MlMjBwb3J0cmFpdCUyMG91dGRvb3J8ZW58MXx8fHwxNzcxNTI1MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_NOOR = "https://images.unsplash.com/photo-1625987306773-8b9e554b25e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwaGlqYWIlMjBwb3J0cmFpdCUyMG1vZGVybiUyMHN0eWxpc2h8ZW58MXx8fHwxNzcxNTI1MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_MARCO = "https://images.unsplash.com/photo-1760050516416-e6df83c9fcad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHRhdHRvbyUyMHBvcnRyYWl0JTIwdXJiYW4lMjBjb29sfGVufDF8fHx8MTc3MTUyNTA1NHww&ixlib=rb-4.1.0&q=80&w=1080";
const AVA_PRIYA = "https://images.unsplash.com/photo-1611246706753-80b59941efc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZmFzaGlvbiUyMGludmx1ZW5jZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzE0Mjg1MTF8MA&ixlib=rb-4.1.0&q=80&w=1080";

export const creators: Creator[] = [
  { id: "1", name: "Sam", handle: "@TheEnthusiastSam", avatar: AVA_SAM, bio: "Trail creator \u2022 Adventure guide \u2022 LA explorer", instagramFollowers: "12.4k", following: 847, trailsCreated: 24, totalViews: "156k" },
  { id: "2", name: "Lorina", handle: "@iamlorina", avatar: AVA_LORINA, bio: "Art lover \u2022 Culture enthusiast \u2022 LA native", instagramFollowers: "8.2k", following: 432, trailsCreated: 12, totalViews: "89k" },
  { id: "3", name: "Tejas", handle: "@TravelWithTejas", avatar: AVA_TEJAS, bio: "Street explorer \u2022 Skate life \u2022 Venice local", instagramFollowers: "15.1k", following: 623, trailsCreated: 18, totalViews: "203k" },
  { id: "4", name: "Aisha", handle: "@AishaCreates", avatar: AVA_AISHA, bio: "Nightlife queen \u2022 DJ \u2022 Hollywood scene guide", instagramFollowers: "22.7k", following: 1203, trailsCreated: 31, totalViews: "340k" },
  { id: "5", name: "Kenji", handle: "@KenjiEats", avatar: AVA_KENJI, bio: "Foodie trails \u2022 Taco hunter \u2022 LA hidden gems", instagramFollowers: "18.9k", following: 534, trailsCreated: 15, totalViews: "178k" },
  { id: "6", name: "Maya", handle: "@MayaWanders", avatar: AVA_MAYA, bio: "Nature trails \u2022 Canyon hikes \u2022 Beach yoga", instagramFollowers: "9.6k", following: 312, trailsCreated: 8, totalViews: "67k" },
  { id: "7", name: "Darius", handle: "@DariusOnFoot", avatar: AVA_DARIUS, bio: "Music trails \u2022 Vinyl digger \u2022 Jazz bar hopper", instagramFollowers: "11.3k", following: 678, trailsCreated: 14, totalViews: "121k" },
  { id: "8", name: "Noor", handle: "@NoorExplores", avatar: AVA_NOOR, bio: "Shopping trails \u2022 Thrift queen \u2022 Vintage finds", instagramFollowers: "14.1k", following: 891, trailsCreated: 20, totalViews: "195k" },
  { id: "9", name: "Marco", handle: "@MarcoSports", avatar: AVA_MARCO, bio: "Sport trails \u2022 Beach fitness \u2022 Canyon runs", instagramFollowers: "20.5k", following: 445, trailsCreated: 22, totalViews: "267k" },
  { id: "10", name: "Priya", handle: "@PriyaSnaps", avatar: AVA_PRIYA, bio: "Photo trails \u2022 Instagrammable spots \u2022 Golden hour", instagramFollowers: "31.2k", following: 1567, trailsCreated: 28, totalViews: "412k" },
];

// ═══════════════════════════════════════════════
// Pilot Trails — March 2026 Cohort (5 trails)
// ═══════════════════════════════════════════════
const _pilotTrails: Trail[] = [
  { id: "pilot-1", title: "The Figueroa Frequency", image: IMG_P_HP_COVER, date: "10 Mar 2026", duration: "~2 hrs", price: "$$", hostName: "Sam", hostHandle: "@TheEnthusiastSam", hostAvatar: AVA_SAM, hostFollowers: "12.4k", hostBio: "Neighborhood deep-dive specialist. Highland Park native.", description: "A deeply local, non-Instagram-famous Highland Park trail. The insider access IS the product — from a pre-gentrification coffee anchor to a 1927 bowling alley with original pin-setting machinery.", totalStops: 4, totalDuration: "95-115 min", distance: "1.8 km", joined: 14, rating: 4.9, views: 842, badge: "Pilot · Insider Access", status: "live", lat: 34.1115, lng: -118.1920, color: "#155DFC", tags: ["coffee", "art", "food"], meta: ["trending", "new", "editors_pick", "popular"], neighborhood: "Highland Park South", vibe: "Neighborhood deep-dive | Insider access is the product", bestTimeOfDay: "Morning", groupFriendly: true, isPilot: true, source: "local", stops: [
    { id: 1, name: "Kumquat Coffee", address: "5520 N Figueroa St, Highland Park, CA 90042", image: IMG_P_KUMQUAT, unlocked: true, checkedIn: false, lat: 34.1127, lng: -118.1917, teaser: "One of the last pre-gentrification Figueroa anchors. The 2009 corner build-out is still original. Order the house blend — the baristas know where you're headed." },
    { id: 2, name: "Figueroa Street Murals", address: "Figueroa St & Ave 53, Highland Park, CA 90042", image: IMG_P_FIG_MURAL, unlocked: false, checkedIn: false, lat: 34.1100, lng: -118.1930, teaser: "One of the oldest publicly-funded Chicano mural programs in LA. The faces are real people — find the caption tiles at the base and look for '1947.'" },
    { id: 3, name: "Avenue 50 Studio", address: "131 N Avenue 50, Highland Park, CA 90042", image: IMG_P_AVE50, unlocked: false, checkedIn: false, lat: 34.1095, lng: -118.1975, teaser: "Community arts gallery running since 1994. The front gate looks locked — it's not. Push it. The studio is in the back courtyard." },
    { id: 4, name: "Highland Park Bowl", address: "5621 N Figueroa St, Highland Park, CA 90042", image: IMG_P_HP_BOWL, unlocked: false, checkedIn: false, lat: 34.1130, lng: -118.1910, teaser: "A 1927 Prohibition-era bowling alley with original pin-setting mechanisms. Order a pizza, ask about the lane history." },
  ]},
  { id: "pilot-2", title: "The Silver Lake Social Circuit", image: IMG_P_SL_COVER, date: "12 Mar 2026", duration: "~2.5 hrs", price: "$$", hostName: "Lorina", hostHandle: "@iamlorina", hostAvatar: AVA_LORINA, hostFollowers: "8.2k", hostBio: "Silver Lake local. Culture + community connector.", description: "Designed to be significantly better with 2-4 people than solo. Shared discovery, a time-specific golden-hour reservoir moment, and a communal debrief at a natural wine bar.", totalStops: 4, totalDuration: "110-140 min", distance: "2.6 km", joined: 22, rating: 4.8, views: 1105, badge: "Pilot · Better Together", status: "live", lat: 34.0870, lng: -118.2695, color: "#8B5CF6", tags: ["coffee", "music", "food", "nightlife"], meta: ["trending", "new", "popular", "editors_pick"], neighborhood: "Silver Lake", vibe: "Local ritual | Designed for shared discovery", bestTimeOfDay: "Late Afternoon", groupFriendly: true, isPilot: true, source: "local", stops: [
    { id: 1, name: "Intelligentsia Coffee", address: "3922 W Sunset Blvd, Los Angeles, CA 90029", image: IMG_P_INTELLI, unlocked: true, checkedIn: false, lat: 34.0896, lng: -118.2762, teaser: "Not undiscovered — that's the point. The neighborhood's social rituals begin here. This trail runs on group energy." },
    { id: 2, name: "Silver Lake Conservatory of Music", address: "4001 Sunset Blvd, Los Angeles, CA 90029", image: IMG_P_CONSERV, unlocked: false, checkedIn: false, lat: 34.0893, lng: -118.2785, teaser: "Founded by Flea (RHCP). Community-funded, free concerts. Walk in, check the bulletin board — if someone is rehearsing, you're allowed to listen." },
    { id: 3, name: "Silver Lake Reservoir", address: "Rowena Ave entrance, Silver Lake, CA 90039", image: IMG_P_RESERVOIR, unlocked: false, checkedIn: false, lat: 34.0875, lng: -118.2620, teaser: "Take Rowena Ave, not Silver Lake Blvd. At the midpoint, face southwest at 5:30 PM. The reservoir turns completely gold." },
    { id: 4, name: "Bar Flores", address: "3804 Sunset Blvd, Los Angeles, CA 90026", image: IMG_P_BAR_FLORES, unlocked: false, checkedIn: false, lat: 34.0882, lng: -118.2730, teaser: "Small natural wine bar built around group debrief. Long tables, shared plates, no screens. Order one bottle for the group." },
  ]},
  { id: "pilot-3", title: "The Echo Park Closed Loop", image: IMG_P_EP_LAKE, date: "14 Mar 2026", duration: "~2 hrs", price: "$", hostName: "Maya", hostHandle: "@MayaWanders", hostAvatar: AVA_MAYA, hostFollowers: "9.6k", hostBio: "Echo Park resident. Nature trails & neighborhood rituals.", description: "All stops within ~0.4 mi radius — zero structural drop-off risk. A meaningful payoff at Mohawk Bend rewards completion. From a 2009 deli institution to 1929 lotus imports to a hidden community garden.", totalStops: 4, totalDuration: "90-110 min", distance: "1.4 km", joined: 18, rating: 4.7, views: 920, badge: "Pilot · Closed Loop", status: "live", lat: 34.0780, lng: -118.2580, color: "#22C55E", tags: ["food", "nature", "art", "coffee"], meta: ["new", "trending", "budget", "editors_pick"], neighborhood: "Echo Park", vibe: "Neighborhood ritual + discovery | Complete the loop", bestTimeOfDay: "Morning", groupFriendly: true, isPilot: true, source: "local", stops: [
    { id: 1, name: "Cookbook", address: "1549 Echo Park Ave, Los Angeles, CA 90026", image: IMG_P_COOKBOOK, unlocked: true, checkedIn: false, lat: 34.0775, lng: -118.2595, teaser: "An Echo Park institution since 2009 — still runs a tab for regulars. Get a coffee or pastry. This is the orient, not the destination." },
    { id: 2, name: "Echo Park Lake — Lotus Garden", address: "Echo Park Lake (NW side), Los Angeles, CA 90026", image: IMG_P_EP_LAKE, unlocked: false, checkedIn: false, lat: 34.0731, lng: -118.2608, teaser: "Lotus plants imported from Japan in 1929. The NW corner has a different energy than the tourist east side. Less photogenic. More true." },
    { id: 3, name: "Echo Park Community Garden", address: "1440 Levitt St, Los Angeles, CA 90026", image: IMG_P_GARDEN, unlocked: false, checkedIn: false, lat: 34.0745, lng: -118.2575, teaser: "A working community garden tucked behind the lake. Take the path behind the south end. Entrance behind a wooden gate — usually unlatched." },
    { id: 4, name: "Mohawk Bend", address: "2141 W Sunset Blvd, Los Angeles, CA 90026", image: IMG_P_MOHAWK, unlocked: false, checkedIn: false, lat: 34.0780, lng: -118.2530, teaser: "A gastropub in a converted 1926 trolley terminal. Ask for the 'car barn' seating — the original trolley bay. You finished the loop." },
  ]},
  { id: "pilot-4", title: "The Elysian Staircase", image: IMG_P_ELYSIAN_COVER, date: "16 Mar 2026", duration: "~2 hrs", price: "$", hostName: "Priya", hostHandle: "@PriyaSnaps", hostAvatar: AVA_PRIYA, hostFollowers: "31.2k", hostBio: "Photo trails · Hidden views · Shareability hunter", description: "Elysian Heights' hidden stairways, elevated murals, and city-view moments generate shareable content users post unprompted. The steepest street in LA, unmarked 1920s stairways, and a mural only visible from one exact spot.", totalStops: 4, totalDuration: "85-100 min", distance: "2.1 km", joined: 11, rating: 4.9, views: 678, badge: "Pilot · Most Shareable", status: "live", lat: 34.0780, lng: -118.2530, color: "#F97316", tags: ["nature", "photo", "sport", "art"], meta: ["new", "trending", "popular", "editors_pick"], neighborhood: "Elysian Heights", vibe: "Hidden gems + visual discovery | Share-worthy", bestTimeOfDay: "Late Afternoon", groupFriendly: true, isPilot: true, source: "local", isFree: true, numericPrice: 0, stops: [
    { id: 1, name: "Baxter Street (Base)", address: "Baxter St at Avon St, Echo Park, CA 90026", image: IMG_P_BAXTER, unlocked: true, checkedIn: false, lat: 34.0785, lng: -118.2510, teaser: "At 33% grade, the steepest public street in LA. Most people who live nearby know it — almost no one comes here." },
    { id: 2, name: "Elysian Heights Stairs", address: "Kenilworth Ave stairs, Elysian Heights, CA 90026", image: IMG_P_STAIRS, unlocked: false, checkedIn: false, lat: 34.0790, lng: -118.2540, teaser: "Public 1920s concrete stairways — not on Google Maps. The view from the Kenilworth landing is a shot almost no one in LA has taken." },
    { id: 3, name: "Elysian Heights Mural", address: "Upper Alvarado / Baxter turn, Elysian Heights, CA 90026", image: IMG_P_STAIR_MURAL, unlocked: false, checkedIn: false, lat: 34.0795, lng: -118.2535, teaser: "Only visible from the second Kenilworth stairway landing. Designed to be photographed from exactly this spot. Tag @cityunlock." },
    { id: 4, name: "Elysian Park Overlook", address: "Elysian Park, Los Angeles, CA 90012", image: IMG_P_ELYSIAN_VIEW, unlocked: false, checkedIn: false, lat: 34.0810, lng: -118.2400, teaser: "LA's oldest municipal park (1886). View of Dodger Stadium, DTLA, and San Gabriels. You've been looking from the hillside — now you're at the top." },
  ]},
  { id: "pilot-5", title: "York Boulevard, Floor One", image: IMG_P_YORK_COVER, date: "18 Mar 2026", duration: "~2 hrs", price: "$$", hostName: "Darius", hostHandle: "@DariusOnFoot", hostAvatar: AVA_DARIUS, hostFollowers: "11.3k", hostBio: "Music trails · Vinyl digger · Neighborhood storyteller", description: "Explicitly ends with 'there's a second trail in this neighborhood' — positive incompleteness as design. From Kitchen Mouse to vinyl to murals to live music. This is floor one.", totalStops: 4, totalDuration: "95-115 min", distance: "2.0 km", joined: 16, rating: 4.8, views: 765, badge: "Pilot · Floor One", status: "live", lat: 34.1102, lng: -118.2100, color: "#F43F5E", tags: ["coffee", "music", "art", "shopping"], meta: ["new", "trending", "popular", "editors_pick"], neighborhood: "Highland Park North", vibe: "Neighborhood unlock | There's always another floor", bestTimeOfDay: "Afternoon", groupFriendly: false, isPilot: true, source: "local", stops: [
    { id: 1, name: "Kitchen Mouse", address: "5904 N Figueroa St, Highland Park, CA 90042", image: IMG_P_KITCHEN, unlocked: true, checkedIn: false, lat: 34.1140, lng: -118.1900, teaser: "If you know Kitchen Mouse, you're actually from here. The York corridor begins four blocks north of the busy part." },
    { id: 2, name: "Permanent Records", address: "5116 York Blvd, Highland Park, CA 90042", image: IMG_P_PERM_REC, unlocked: false, checkedIn: false, lat: 34.1102, lng: -118.2100, teaser: "Survived gentrification by getting more specific. Browse the 'LA local only' bin — records you can't stream." },
    { id: 3, name: "York Blvd Mural Corridor", address: "York Blvd, Ave 55-57, Highland Park, CA 90042", image: IMG_P_YORK_MURAL, unlocked: false, checkedIn: false, lat: 34.1095, lng: -118.2050, teaser: "The largest panel at Ave 57 has no signature. The artist is in a tile at the base — you have to crouch. Title: 'Before the Boulevard.'" },
    { id: 4, name: "The Hi", address: "5043 York Blvd, Highland Park, CA 90042", image: IMG_P_THE_HI, unlocked: false, checkedIn: false, lat: 34.1100, lng: -118.2105, teaser: "You've covered York Blvd end to end. That's one layer. Trail 2 begins where this one ends. This is floor one." },
  ]},
];

// All static trails are tagged with los-angeles cityId
const _rawTrails: Trail[] = [
  {
    id: "1",
    title: "Coffee & Murals Trail",
    image: IMG_COFFEE,
    date: "15 Jan 2026",
    duration: "~1-2 hrs",
    price: "$$",
    hostName: "Sam",
    hostHandle: "@TheEnthusiastSam",
    hostAvatar: AVA_SAM,
    hostFollowers: "12.4k",
    hostBio: "LA coffee nerd + mural hunter",
    description: "A perfect blend of caffeine and color. Hit artisan coffee spots in Silver Lake, browse street art, and finish with an Instagrammable latte.",
    totalStops: 4,
    totalDuration: "55-65 min",
    distance: "2.4 km",
    joined: 24,
    rating: 4.9,
    views: 1234,
    status: "live",
    lat: 34.0870,
    lng: -118.2695,
    color: "#155DFC",
    tags: ["coffee", "art"],
    meta: ["trending", "popular"],
    neighborhood: "Silver Lake / Echo Park",
    vibe: "Chill caffeine + indie mural crawl",
    bestTimeOfDay: "Morning",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Intelligentsia Coffee", address: "3922 W Sunset Blvd, Los Angeles, CA 90029", image: IMG_COFFEE, unlocked: true, checkedIn: false, lat: 34.0896, lng: -118.2762, teaser: "The perfect pour-over to kickstart your trail" },
      { id: 2, name: "Sunset Junction Murals", address: "Sunset Blvd & Sanborn Ave, Los Angeles, CA 90026", image: IMG_STREET_ART, unlocked: false, checkedIn: false, lat: 34.0882, lng: -118.2680, teaser: "Colorful walls that tell stories of the neighborhood" },
      { id: 3, name: "Echo Park Lake", address: "751 N Echo Park Ave, Los Angeles, CA 90026", image: IMG_ECHO_PARK, unlocked: false, checkedIn: false, lat: 34.0731, lng: -118.2608, teaser: "A peaceful lakeside stroll with DTLA skyline views" },
      { id: 4, name: "Matcha & Reflect", address: "Cha Cha Matcha, 3663 W Sunset Blvd, LA 90026", image: IMG_MATCHA, unlocked: false, checkedIn: false, lat: 34.0905, lng: -118.2800, teaser: "End on a high note with a creamy matcha masterpiece" },
    ],
  },
  {
    id: "2",
    title: "Arts District Experience",
    image: IMG_GALLERY,
    date: "16 Jan 2026",
    duration: "~2-3 hrs",
    price: "$",
    hostName: "Lorina",
    hostHandle: "@iamlorina",
    hostAvatar: AVA_LORINA,
    hostFollowers: "8.2k",
    hostBio: "Art lover and culture curator in LA",
    description: "Explore the hidden art gems of DTLA's Arts District. From underground galleries to massive murals, this trail takes you through LA's creative soul.",
    totalStops: 5,
    totalDuration: "90-120 min",
    distance: "3.1 km",
    joined: 18,
    rating: 4.7,
    views: 987,
    badge: "Perfect for slow afternoons",
    status: "past",
    lat: 34.0408,
    lng: -118.2340,
    color: "#8B5CF6",
    tags: ["art", "photo"],
    meta: ["editors_pick", "budget"],
    neighborhood: "Arts District / Little Tokyo",
    vibe: "Gallery-hopping through LA's creative soul",
    bestTimeOfDay: "Afternoon",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Hauser & Wirth Gallery", address: "901 E 3rd St, Los Angeles, CA 90013", image: IMG_GALLERY, unlocked: true, checkedIn: false, lat: 34.0394, lng: -118.2334, teaser: "Step into a world of curated contemporary art" },
      { id: 2, name: "Arts District Murals", address: "E 3rd St & Traction Ave, Los Angeles, CA 90013", image: IMG_STREET_ART, unlocked: false, checkedIn: false, lat: 34.0420, lng: -118.2351, teaser: "An open-air gallery that redefines street art" },
      { id: 3, name: "Little Tokyo Cultural Center", address: "244 S San Pedro St, Los Angeles, CA 90012", image: IMG_DTLA, unlocked: false, checkedIn: false, lat: 34.0487, lng: -118.2410, teaser: "Where tradition and modern art collide" },
      { id: 4, name: "Angel City Brewery", address: "216 S Alameda St, Los Angeles, CA 90012", image: IMG_COFFEE, unlocked: false, checkedIn: false, lat: 34.0472, lng: -118.2355, teaser: "A creative brewery space with rotating art shows" },
      { id: 5, name: "Rooftop Art Spot", address: "ROW DTLA, 777 S Alameda St, Los Angeles, CA 90021", image: IMG_GOLDEN, unlocked: false, checkedIn: false, lat: 34.0359, lng: -118.2365, teaser: "Art meets skyline for an unforgettable finale" },
    ],
  },
  {
    id: "3",
    title: "Venice Skate & Street Art",
    image: IMG_VENICE_SKATE,
    date: "16 Jan 2026",
    duration: "~3-4 hrs",
    price: "$$$",
    hostName: "Tejas",
    hostHandle: "@TravelWithTejas",
    hostAvatar: AVA_TEJAS,
    hostFollowers: "15.1k",
    hostBio: "Street culture explorer and skate enthusiast",
    description: "Cruise through Venice Beach's best skate spots and street art. From the boardwalk to Abbot Kinney, this trail combines adrenaline with aesthetics.",
    totalStops: 6,
    totalDuration: "120-180 min",
    distance: "5.2 km",
    joined: 32,
    rating: 4.8,
    views: 2156,
    status: "hosted",
    lat: 33.9930,
    lng: -118.4695,
    color: "#EF4444",
    tags: ["sport", "art"],
    meta: ["trending", "popular"],
    neighborhood: "Venice / Mar Vista",
    vibe: "Adrenaline meets beachside street aesthetics",
    bestTimeOfDay: "Afternoon",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Venice Skatepark", address: "1800 Ocean Front Walk, Venice, CA 90291", image: IMG_VENICE_SKATE, unlocked: true, checkedIn: false, lat: 33.9878, lng: -118.4725, teaser: "Warm up with some grinds at a legendary spot" },
      { id: 2, name: "Venice Art Walls", address: "1800 Ocean Front Walk, Venice, CA 90291", image: IMG_STREET_ART, unlocked: false, checkedIn: false, lat: 33.9873, lng: -118.4720, teaser: "Legal graffiti walls where every visit is different" },
      { id: 3, name: "Muscle Beach", address: "1800 Ocean Front Walk, Venice, CA 90291", image: IMG_FITNESS, unlocked: false, checkedIn: false, lat: 33.9890, lng: -118.4730, teaser: "Where bodybuilding legends were made" },
      { id: 4, name: "Venice Canals", address: "Venice Canal Historic District, Venice, CA 90291", image: IMG_ECHO_PARK, unlocked: false, checkedIn: false, lat: 33.9820, lng: -118.4665, teaser: "A hidden neighborhood that feels like Europe" },
      { id: 5, name: "Abbot Kinney Blvd", address: "Abbot Kinney Blvd, Venice, CA 90291", image: IMG_SILVER_LAKE, unlocked: false, checkedIn: false, lat: 33.9912, lng: -118.4647, teaser: "The coolest block in America according to GQ" },
      { id: 6, name: "Gjusta Bakery", address: "320 Sunset Ave, Venice, CA 90291", image: IMG_TACO, unlocked: false, checkedIn: false, lat: 33.9903, lng: -118.4674, teaser: "End the crawl with LA's best pastries" },
    ],
  },
  {
    id: "4",
    title: "Fam Meetup & Experiences",
    image: IMG_FRIENDS,
    date: "15 Jan 2026",
    duration: "~3-4 hrs",
    price: "$$",
    hostName: "Sam",
    hostHandle: "@TheEnthusiastSam",
    hostAvatar: AVA_SAM,
    hostFollowers: "12.4k",
    hostBio: "Community builder and experience curator",
    description: "A fun-filled trail bringing friends and families together. Explore hidden spots, play games, and create memories across LA.",
    totalStops: 4,
    totalDuration: "120-180 min",
    distance: "3.8 km",
    joined: 42,
    rating: 4.6,
    views: 1567,
    status: "past",
    lat: 34.0736,
    lng: -118.2410,
    color: "#F59E0B",
    tags: ["food", "nature", "coffee"],
    meta: ["popular", "budget"],
    neighborhood: "Echo Park / Silver Lake",
    vibe: "Friends & family fun across the Eastside",
    bestTimeOfDay: "Afternoon",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Echo Park Lake Picnic", address: "751 N Echo Park Ave, Los Angeles, CA 90026", image: IMG_FRIENDS, unlocked: true, checkedIn: false, lat: 34.0731, lng: -118.2608, teaser: "Meet the crew at a scenic urban oasis" },
      { id: 2, name: "Elysian Park Hike", address: "929 Academy Rd, Los Angeles, CA 90012", image: IMG_CANYON, unlocked: false, checkedIn: false, lat: 34.0810, lng: -118.2400, teaser: "Short hike with panoramic views of DTLA" },
      { id: 3, name: "Grand Central Market", address: "317 S Broadway, Los Angeles, CA 90013", image: IMG_TACO, unlocked: false, checkedIn: false, lat: 34.0508, lng: -118.2488, teaser: "Refuel with flavors from around the world" },
      { id: 4, name: "Sunset at Griffith Observatory", address: "2800 E Observatory Rd, Los Angeles, CA 90027", image: IMG_GRIFFITH, unlocked: false, checkedIn: false, lat: 34.1185, lng: -118.3004, teaser: "Golden hour vibes to close out the day" },
    ],
  },
  {
    id: "5",
    title: "Taste of LA",
    image: IMG_TACO,
    date: "18 Jan 2026",
    duration: "~2-3 hrs",
    price: "$$",
    hostName: "Kenji",
    hostHandle: "@KenjiEats",
    hostAvatar: AVA_KENJI,
    hostFollowers: "18.9k",
    hostBio: "Foodie trails \u2022 Taco hunter \u2022 LA hidden gems",
    description: "From street tacos in Boyle Heights to K-Town BBQ, this trail hits LA's most underrated food spots. Come hungry, leave inspired.",
    totalStops: 5,
    totalDuration: "90-120 min",
    distance: "3.5 km",
    joined: 56,
    rating: 4.9,
    views: 3420,
    badge: "Most popular this week",
    status: "live",
    lat: 34.0522,
    lng: -118.2437,
    color: "#F97316",
    tags: ["food", "coffee"],
    meta: ["trending", "popular", "editors_pick"],
    neighborhood: "Koreatown / Boyle Heights / DTLA",
    vibe: "Eat your way through LA's hidden gems",
    bestTimeOfDay: "Afternoon",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Mariscos Jalisco", address: "3040 E Olympic Blvd, Los Angeles, CA 90023", image: IMG_TACO, unlocked: true, checkedIn: false, lat: 34.0230, lng: -118.2200, teaser: "Shrimp tacos so good they're legendary" },
      { id: 2, name: "Grand Central Market", address: "317 S Broadway, Los Angeles, CA 90013", image: IMG_TACO, unlocked: false, checkedIn: false, lat: 34.0508, lng: -118.2488, teaser: "A century-old food hall with 40+ vendors" },
      { id: 3, name: "Kang Ho-dong Baekjeong", address: "3465 W 6th St, Los Angeles, CA 90020", image: IMG_KBBQ, unlocked: false, checkedIn: false, lat: 34.0638, lng: -118.2970, teaser: "K-Town Korean BBQ that sizzles with flavor" },
      { id: 4, name: "Guerrilla Tacos", address: "2000 E 7th St, Los Angeles, CA 90021", image: IMG_TACO, unlocked: false, checkedIn: false, lat: 34.0332, lng: -118.2305, teaser: "Chef-driven tacos that push the boundaries" },
      { id: 5, name: "Cafe de Leche", address: "5000 York Blvd, Los Angeles, CA 90042", image: IMG_COFFEE, unlocked: false, checkedIn: false, lat: 34.1108, lng: -118.2095, teaser: "A cozy horchata latte to end the crawl" },
    ],
  },
  {
    id: "6",
    title: "Runyon Canyon Run",
    image: IMG_FITNESS,
    date: "20 Jan 2026",
    duration: "~1-2 hrs",
    price: "$",
    hostName: "Marco",
    hostHandle: "@MarcoSports",
    hostAvatar: AVA_MARCO,
    hostFollowers: "20.5k",
    hostBio: "Sport trails \u2022 Beach fitness \u2022 Canyon runs",
    description: "A high-energy fitness trail through LA's iconic canyon and beach spots. Bodyweight circuits, stair runs, and scenic stretches \u2014 all outdoors.",
    totalStops: 4,
    totalDuration: "60-90 min",
    distance: "4.1 km",
    joined: 28,
    rating: 4.7,
    views: 1890,
    status: "live",
    lat: 34.1060,
    lng: -118.3480,
    color: "#3B82F6",
    tags: ["sport", "wellness", "nature"],
    meta: ["new", "trending"],
    neighborhood: "Hollywood Hills / Los Feliz",
    vibe: "High-energy canyon circuits with views",
    bestTimeOfDay: "Morning",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Runyon Canyon Entrance", address: "2000 N Fuller Ave, Los Angeles, CA 90046", image: IMG_FITNESS, unlocked: true, checkedIn: false, lat: 34.1070, lng: -118.3483, teaser: "Get moving with a warm-up at the trailhead" },
      { id: 2, name: "Runyon Summit", address: "Runyon Canyon Park, Los Angeles, CA 90046", image: IMG_CANYON, unlocked: false, checkedIn: false, lat: 34.1120, lng: -118.3502, teaser: "360-degree views of LA from the top" },
      { id: 3, name: "Lake Hollywood Trail", address: "3160 Canyon Lake Dr, Los Angeles, CA 90068", image: IMG_CANYON, unlocked: false, checkedIn: false, lat: 34.1175, lng: -118.3295, teaser: "A hidden loop with the Hollywood Sign backdrop" },
      { id: 4, name: "Griffith Park Cooldown", address: "4730 Crystal Springs Dr, Los Angeles, CA 90027", image: IMG_GRIFFITH, unlocked: false, checkedIn: false, lat: 34.1185, lng: -118.3004, teaser: "Stretch it out with views of the observatory" },
    ],
  },
  {
    id: "7",
    title: "Thrift & Vintage Crawl",
    image: IMG_MELROSE,
    date: "19 Jan 2026",
    duration: "~2-3 hrs",
    price: "$$",
    hostName: "Noor",
    hostHandle: "@NoorExplores",
    hostAvatar: AVA_NOOR,
    hostFollowers: "14.1k",
    hostBio: "Shopping trails \u2022 Thrift queen \u2022 Vintage finds",
    description: "Hit the best thrift stores, vintage boutiques, and hidden consignment gems across Melrose, Fairfax, and Silver Lake.",
    totalStops: 5,
    totalDuration: "100-140 min",
    distance: "3.2 km",
    joined: 35,
    rating: 4.8,
    views: 2780,
    badge: "Community favorite",
    status: "hosted",
    lat: 34.0838,
    lng: -118.3614,
    color: "#EC4899",
    tags: ["shopping", "art", "photo"],
    meta: ["trending", "editors_pick"],
    neighborhood: "Melrose / Fairfax / Silver Lake",
    vibe: "Curated thrifting through LA's best",
    bestTimeOfDay: "Late Morning",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Wasteland Melrose", address: "7428 Melrose Ave, Los Angeles, CA 90046", image: IMG_MELROSE, unlocked: true, checkedIn: false, lat: 34.0836, lng: -118.3510, teaser: "Racks on racks of hidden vintage gold" },
      { id: 2, name: "Crossroads Trading", address: "7613 Melrose Ave, Los Angeles, CA 90046", image: IMG_MELROSE, unlocked: false, checkedIn: false, lat: 34.0836, lng: -118.3570, teaser: "Where LA cool meets secondhand steals" },
      { id: 3, name: "Jet Rag", address: "825 N La Brea Ave, Los Angeles, CA 90038", image: IMG_MELROSE, unlocked: false, checkedIn: false, lat: 34.0840, lng: -118.3442, teaser: "Sunday dollar sale is legendary" },
      { id: 4, name: "Squaresville", address: "1800 N Vermont Ave, Los Angeles, CA 90027", image: IMG_MELROSE, unlocked: false, checkedIn: false, lat: 34.1010, lng: -118.2920, teaser: "Los Feliz's best-kept vintage secret" },
      { id: 5, name: "Melrose Mural Wall Photo Stop", address: "Melrose Ave & N Fairfax Ave, Los Angeles, CA 90046", image: IMG_STREET_ART, unlocked: false, checkedIn: false, lat: 34.0835, lng: -118.3614, teaser: "Strike a pose with your haul at this Insta wall" },
    ],
  },
  {
    id: "8",
    title: "After Dark LA",
    image: IMG_ROOFTOP,
    date: "17 Jan 2026",
    duration: "~3-4 hrs",
    price: "$$$",
    hostName: "Aisha",
    hostHandle: "@AishaCreates",
    hostAvatar: AVA_AISHA,
    hostFollowers: "22.7k",
    hostBio: "Nightlife queen \u2022 DJ \u2022 Hollywood scene guide",
    description: "Speakeasies, rooftop lounges, and underground DJ sets. This trail takes you through LA's best after-dark spots.",
    totalStops: 4,
    totalDuration: "150-210 min",
    distance: "2.8 km",
    joined: 47,
    rating: 4.8,
    views: 4100,
    status: "live",
    lat: 34.0930,
    lng: -118.3273,
    color: "#6366F1",
    tags: ["nightlife", "music", "food"],
    meta: ["trending", "popular"],
    neighborhood: "Hollywood / West Hollywood",
    vibe: "Speakeasies, rooftops & underground beats",
    bestTimeOfDay: "Evening",
    groupFriendly: false,
    stops: [
      { id: 1, name: "Good Times at Davey Wayne's", address: "1611 N El Centro Ave, Los Angeles, CA 90028", image: IMG_ROOFTOP, unlocked: true, checkedIn: false, lat: 34.0998, lng: -118.3280, teaser: "A hidden entrance leads to 70s cocktail magic" },
      { id: 2, name: "No Vacancy", address: "1727 N Hudson Ave, Los Angeles, CA 90028", image: IMG_ROOFTOP, unlocked: false, checkedIn: false, lat: 34.1007, lng: -118.3330, teaser: "A Victorian mansion turned secret cocktail bar" },
      { id: 3, name: "Perch Rooftop", address: "448 S Hill St, Los Angeles, CA 90013", image: IMG_ROOFTOP, unlocked: false, checkedIn: false, lat: 34.0498, lng: -118.2528, teaser: "Drinks above the DTLA skyline with live music" },
      { id: 4, name: "Sound Nightclub", address: "1642 N Las Palmas Ave, Los Angeles, CA 90028", image: IMG_ROOFTOP, unlocked: false, checkedIn: false, lat: 34.0997, lng: -118.3343, teaser: "Deep bass and dark dance floors to close the night" },
    ],
  },
  {
    id: "9",
    title: "Griffith Park Escape",
    image: IMG_GRIFFITH,
    date: "21 Jan 2026",
    duration: "~2-3 hrs",
    price: "$",
    hostName: "Maya",
    hostHandle: "@MayaWanders",
    hostAvatar: AVA_MAYA,
    hostFollowers: "9.6k",
    hostBio: "Nature trails \u2022 Canyon hikes \u2022 Beach yoga",
    description: "A peaceful nature walk through Griffith Park's hidden trails, scenic overlooks, and the iconic observatory. Disconnect and recharge.",
    totalStops: 4,
    totalDuration: "90-120 min",
    distance: "3.6 km",
    joined: 19,
    rating: 4.6,
    views: 890,
    status: "past",
    lat: 34.1185,
    lng: -118.3004,
    color: "#22C55E",
    tags: ["nature", "wellness", "photo"],
    meta: ["new", "budget"],
    neighborhood: "Los Feliz / Griffith Park",
    vibe: "Peaceful nature walk through iconic trails",
    bestTimeOfDay: "Morning",
    groupFriendly: true,
    stops: [
      { id: 1, name: "Fern Dell Trail", address: "Fern Dell Dr, Los Angeles, CA 90027", image: IMG_CANYON, unlocked: true, checkedIn: false, lat: 34.1130, lng: -118.3045, teaser: "A shaded woodland trail most Angelenos don't know" },
      { id: 2, name: "Griffith Observatory", address: "2800 E Observatory Rd, Los Angeles, CA 90027", image: IMG_GRIFFITH, unlocked: false, checkedIn: false, lat: 34.1185, lng: -118.3004, teaser: "The most iconic viewpoint in all of Los Angeles" },
      { id: 3, name: "Hollywood Sign Viewpoint", address: "Mt Hollywood Trail, Los Angeles, CA 90027", image: IMG_CANYON, unlocked: false, checkedIn: false, lat: 34.1341, lng: -118.3215, teaser: "Get the perfect sign shot without the crowds" },
      { id: 4, name: "Trails Cafe", address: "2333 Fern Dell Dr, Los Angeles, CA 90068", image: IMG_COFFEE, unlocked: false, checkedIn: false, lat: 34.1140, lng: -118.3050, teaser: "A charming cafe nestled in the park" },
    ],
  },
  {
    id: "10",
    title: "Vinyl & Jazz Crawl",
    image: IMG_VINYL,
    date: "18 Jan 2026",
    duration: "~3-4 hrs",
    price: "$$",
    hostName: "Darius",
    hostHandle: "@DariusOnFoot",
    hostAvatar: AVA_DARIUS,
    hostFollowers: "11.3k",
    hostBio: "Music trails \u2022 Vinyl digger \u2022 Jazz bar hopper",
    description: "Dig through crates at legendary record shops, then catch live jazz at intimate venues. A trail for music lovers in LA.",
    totalStops: 5,
    totalDuration: "120-180 min",
    distance: "2.9 km",
    joined: 38,
    rating: 4.9,
    views: 2340,
    status: "hosted",
    lat: 34.0838,
    lng: -118.3443,
    color: "#F43F5E",
    tags: ["music", "nightlife", "shopping"],
    meta: ["popular", "editors_pick"],
    neighborhood: "Hollywood / Highland Park / Leimert Park",
    vibe: "Crate-digging and live jazz sessions",
    bestTimeOfDay: "Evening",
    groupFriendly: false,
    stops: [
      { id: 1, name: "Amoeba Music", address: "6200 Hollywood Blvd, Los Angeles, CA 90028", image: IMG_VINYL, unlocked: true, checkedIn: false, lat: 34.0982, lng: -118.3245, teaser: "Dig through crates at the world's largest record shop" },
      { id: 2, name: "Permanent Records", address: "5116 York Blvd, Los Angeles, CA 90042", image: IMG_VINYL, unlocked: false, checkedIn: false, lat: 34.1102, lng: -118.2100, teaser: "A vinyl-only spot where DJs come to hunt" },
      { id: 3, name: "The Blue Whale", address: "123 Astronaut E S Onizuka St, Los Angeles, CA 90012", image: IMG_JAZZ, unlocked: false, checkedIn: false, lat: 34.0492, lng: -118.2427, teaser: "Intimate live jazz above Little Tokyo" },
      { id: 4, name: "Sam First", address: "112 E 4th St, Los Angeles, CA 90013", image: IMG_JAZZ, unlocked: false, checkedIn: false, lat: 34.0477, lng: -118.2460, teaser: "Underground jazz in the heart of DTLA" },
      { id: 5, name: "Leimert Park Village", address: "4343 Leimert Blvd, Los Angeles, CA 90008", image: IMG_JAZZ, unlocked: false, checkedIn: false, lat: 34.0080, lng: -118.3328, teaser: "LA's historic hub of Black culture and jazz" },
    ],
  },
  {
    id: "11",
    title: "Golden Hour Spots",
    image: IMG_GOLDEN,
    date: "22 Jan 2026",
    duration: "~2-3 hrs",
    price: "$",
    hostName: "Priya",
    hostHandle: "@PriyaSnaps",
    hostAvatar: AVA_PRIYA,
    hostFollowers: "31.2k",
    hostBio: "Photo trails \u2022 Instagrammable spots \u2022 Golden hour",
    description: "Chase the light across LA's most photogenic spots. From urban rooftops to beachside sunsets \u2014 bring your camera.",
    totalStops: 5,
    totalDuration: "100-140 min",
    distance: "4.0 km",
    joined: 22,
    rating: 4.7,
    views: 1650,
    status: "past",
    lat: 33.9870,
    lng: -118.4720,
    color: "#F59E0B",
    tags: ["photo", "art", "nature"],
    meta: ["new", "trending"],
    neighborhood: "Venice / Santa Monica / DTLA",
    vibe: "Chase the light across photogenic spots",
    bestTimeOfDay: "Late Afternoon",
    groupFriendly: true,
    stops: [
      { id: 1, name: "DTLA Rooftop View", address: "ROW DTLA, 777 S Alameda St, Los Angeles, CA 90021", image: IMG_GOLDEN, unlocked: true, checkedIn: false, lat: 34.0359, lng: -118.2365, teaser: "The skyline bathed in warm afternoon light" },
      { id: 2, name: "Venice Boardwalk", address: "Ocean Front Walk, Venice, CA 90291", image: IMG_VENICE_SKATE, unlocked: false, checkedIn: false, lat: 33.9878, lng: -118.4725, teaser: "Golden light painting the boardwalk performers" },
      { id: 3, name: "Santa Monica Pier", address: "200 Santa Monica Pier, Santa Monica, CA 90401", image: IMG_SANTA_MONICA, unlocked: false, checkedIn: false, lat: 34.0094, lng: -118.4973, teaser: "The iconic pier silhouetted against the sunset" },
      { id: 4, name: "Malibu El Matador Beach", address: "32215 Pacific Coast Hwy, Malibu, CA 90265", image: IMG_MALIBU, unlocked: false, checkedIn: false, lat: 34.0381, lng: -118.8745, teaser: "Sea stacks and crashing waves at golden hour" },
      { id: 5, name: "Griffith Observatory Silhouette", address: "2800 E Observatory Rd, Los Angeles, CA 90027", image: IMG_GRIFFITH, unlocked: false, checkedIn: false, lat: 34.1185, lng: -118.3004, teaser: "Silhouette yourself against the city of angels" },
    ],
  },
  {
    id: "12",
    title: "Morning Zen Walk",
    image: IMG_YOGA,
    date: "23 Jan 2026",
    duration: "~1-2 hrs",
    price: "$",
    hostName: "Maya",
    hostHandle: "@MayaWanders",
    hostAvatar: AVA_MAYA,
    hostFollowers: "9.6k",
    hostBio: "Nature trails \u2022 Canyon hikes \u2022 Beach yoga",
    description: "Start your day with intention. Guided breathing, gentle stretches, and a mindful walk through quiet corners of the city.",
    totalStops: 4,
    totalDuration: "50-70 min",
    distance: "1.8 km",
    joined: 15,
    rating: 4.9,
    views: 720,
    status: "hosted",
    lat: 34.0094,
    lng: -118.4973,
    color: "#14B8A6",
    tags: ["wellness", "nature", "coffee"],
    meta: ["new", "budget"],
    neighborhood: "Santa Monica / Venice",
    vibe: "Start your day with intention and calm",
    bestTimeOfDay: "Early Morning",
    groupFriendly: false,
    stops: [
      { id: 1, name: "Santa Monica Beach Yoga", address: "Santa Monica State Beach, Santa Monica, CA 90401", image: IMG_YOGA, unlocked: true, checkedIn: false, lat: 34.0094, lng: -118.4973, teaser: "Greet the sun with gentle stretches on the sand" },
      { id: 2, name: "Palisades Park Walk", address: "Ocean Ave, Santa Monica, CA 90401", image: IMG_SANTA_MONICA, unlocked: false, checkedIn: false, lat: 34.0182, lng: -118.5060, teaser: "Bluff-top stroll with Pacific Ocean views" },
      { id: 3, name: "Tongva Park Breathwork", address: "1615 Ocean Ave, Santa Monica, CA 90401", image: IMG_CANYON, unlocked: false, checkedIn: false, lat: 34.0130, lng: -118.4985, teaser: "Breathe deep in a sculptural green space" },
      { id: 4, name: "Matcha & Reflect", address: "Cha Cha Matcha, Santa Monica, CA 90401", image: IMG_MATCHA, unlocked: false, checkedIn: false, lat: 34.0152, lng: -118.4960, teaser: "Wind down with a creamy matcha and your thoughts" },
    ],
  },
];

// Stamp every static trail with its city — pilot trails come first
export const trails: Trail[] = [
  ..._pilotTrails.map((t) => ({ ...t, cityId: t.cityId || "los-angeles" })),
  ..._rawTrails.map((t) => ({ ...t, cityId: t.cityId || "los-angeles" })),
];

/** Get static trails filtered by city ID */
export function getTrailsForCity(cityId: string): Trail[] {
  return trails.filter((t) => t.cityId === cityId);
}