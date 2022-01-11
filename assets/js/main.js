	const convertTimes = function (UNIX_timestamp = 0, format = "d.m.y") {
		let time = parseInt(UNIX_timestamp);
		if (Number.isNaN(time) || time < 1e9) {
			time = 1e9
		} else if (time < 9e9) {
			time = time * 1e3
		}
		const pad = s => s < 10 ? "0" + s : s;
		const date = new Date(time);
		format = format.replace(/y+/gi, date.getFullYear());
		format = format.replace(/d+/gi, pad(date.getDate()));
		format = format.replace(/m+/gi, pad(date.getMonth() + 1));
		format = format.replace(/h+/gi, pad(date.getHours()));
		format = format.replace(/i+/gi, pad(date.getMinutes()));
		format = format.replace(/s+/gi, pad(date.getSeconds()));
		return format
	}
	const countDown = {
		now: {
			now: new Date().getTime(),
			year: new Date().getFullYear(),
			mounth: new Date().getMonth(),
			day: new Date().getDate(),
			weekday: new Date().getDay(),
			hour: new Date().getHours(),
			second: new Date().getSeconds()
		},
		opt: {
			1: {target: 15, inCargo: 0,  elseDay:1,elseTarget: 15, elseCargo:1},
	        2: {target: 15, inCargo: 0,  elseDay:1,elseTarget: 15, elseCargo:1},
	        3: {target: 15, inCargo: 0,  elseDay:1,elseTarget: 15, elseCargo:1},
	        4: {target: 15, inCargo: 0,  elseDay:1,elseTarget: 15, elseCargo:1},
	        5: {target: 15, inCargo: 0,  elseDay:1,elseTarget: 12, elseCargo:1},
	        6: {target: 12, inCargo: null,  elseDay:2,elseTarget: 15, elseCargo:2},
			0: {target: null, inCargo: null,  elseDay:1,elseTarget: 15, elseCargo:1}
		},
		whenCargo(cargoDay, time=null){
			let message="";
			if (cargoDay == 0){
				message="Bugün";
			}else if(cargoDay==1){
				message="Yarın"
			}else{
				message=convertTimes(time) + " tarihinde ";
			}
			return message;
		},
		init(elem, options) {
			for (let i in options) {
				this.opt[i] = options[i];
			}
			let realHour = this.now.hour;
			let realDay = this.now.weekday;
			let zeroDay = new Date(this.now.year, this.now.mounth, this.now.day, 0, 0, 0).getTime();
			let cargoTime=zeroDay +this.opt[realDay].elseCargo * 24 * 60 * 60 * 1000;
			let target = 0;
			let cargoMessage=null;
			if (realHour < this.opt[realDay].target) {
				target = zeroDay + 
					this.opt[realDay].target * 60 * 60 * 1000;
					cargoMessage=this.whenCargo(	this.opt[realDay].inCargo, cargoTime)
			} else {
				target = zeroDay +
					(this.opt[realDay].elseTarget) * 60 * 60 * 1000 +
					this.opt[realDay].elseDay * 24 * 60 * 60 * 1000;
					cargoMessage=this.whenCargo(this.opt[realDay].inCargo, cargoTime)
			}
			countDown.showResult(elem, new Date(target), cargoMessage)
		},
		showResult(element, target,msg) {
			const x = setInterval(function () {
				const now = new Date;
				const countDate = new Date(target);
				const amount = Date.parse(countDate) - Date.parse(now);
				delete now;
				if (amount < 0) {
					clearInterval(x);
					return
				}
				const pad = s => s < 10 ? "0" + s : s;
				const days = Math.floor(amount / (1e3 * 60 * 60 * 24)),
					hours = Math.floor(amount % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60)),
					minutes = Math.floor(amount % (1e3 * 60 * 60) / (1e3 * 60)),
					seconds = Math.floor(amount % (1e3 * 60) / 1e3);
				element.innerHTML = `
			    <div class="cargo-times">
					<div class="cargo-day ${days?"":"d-none"}">${days} <span>Gün</span>  </div>
					<div class="cargo-hour">${days?":":""}${pad(hours)} <span>Saat</span></div>
					<div class="cargo-minute">:${pad(minutes)} <span>Dakika</span></div>
					<div class="cargo-second">:${pad(seconds)} <span>Saniye</span></div>
					<div class="col"> içinde sipariş verirseniz </div>
				</div>
				<div class="cargo-message">
					<div class="in-cargo">${msg }</div>
					<div class="col"> kargoda </div>
				</div>
				`
			}, 1e3)
		}
	};

