import { Injectable } from '@angular/core';

@Injectable()
export class WeatherIconsService {

  icons: Array<string> = [
    'wi-day-sunny',
    'wi-day-cloudy',
    'wi-day-cloudy-gusts',
    'wi-day-cloudy-windy',
    'wi-day-fog',
    'wi-day-hail',
    'wi-day-haze',
    'wi-day-lightning',
    'wi-day-rain',
    'wi-day-rain-mix',
    'wi-day-rain-wind',
    'wi-day-showers',
    'wi-day-sleet',
    'wi-day-sleet-storm',
    'wi-day-snow',
    'wi-day-snow-thunderstorm',
    'wi-day-snow-wind',
    'wi-day-sprinkle',
    'wi-day-storm-showers',
    'wi-day-sunny-overcast',
    'wi-day-thunderstorm',
    'wi-day-windy',
    'wi-solar-eclipse',
    'wi-hot',
    'wi-day-cloudy-high',
    'wi-day-light-wind',
    'wi-night-clear',
    'wi-night-alt-cloudy',
    'wi-night-alt-cloudy-gusts',
    'wi-night-alt-cloudy-windy',
    'wi-night-alt-hail',
    'wi-night-alt-lightning',
    'wi-night-alt-rain',
    'wi-night-alt-rain-mix',
    'wi-night-alt-rain-wind',
    'wi-night-alt-showers',
    'wi-night-alt-sleet',
    'wi-night-alt-sleet-storm',
    'wi-night-alt-snow',
    'wi-night-alt-snow-thunderstorm',
    'wi-night-alt-snow-wind',
    'wi-night-alt-sprinkle',
    'wi-night-alt-storm-showers',
    'wi-night-alt-thunderstorm',
    'wi-night-cloudy',
    'wi-night-cloudy-gusts',
    'wi-night-cloudy-windy',
    'wi-night-fog',
    'wi-night-hail',
    'wi-night-lightning',
    'wi-night-partly-cloudy',
    'wi-night-rain',
    'wi-night-rain-mix',
    'wi-night-rain-wind',
    'wi-night-showers',
    'wi-night-sleet',
    'wi-night-sleet-storm',
    'wi-night-snow',
    'wi-night-snow-thunderstorm',
    'wi-night-snow-wind',
    'wi-night-sprinkle',
    'wi-night-storm-showers',
    'wi-night-thunderstorm',
    'wi-lunar-eclipse',
    'wi-stars',
    'wi-storm-showers',
    'wi-thunderstorm',
    'wi-night-alt-cloudy-high',
    'wi-night-cloudy-high',
    'wi-night-alt-partly-cloudy',
    'wi-cloud',
    'wi-cloudy',
    'wi-cloudy-gusts',
    'wi-cloudy-windy',
    'wi-fog',
    'wi-hail',
    'wi-rain',
    'wi-rain-mix',
    'wi-rain-wind',
    'wi-showers',
    'wi-sleet',
    'wi-snow',
    'wi-sprinkle',
    'wi-storm-showers',
    'wi-thunderstorm',
    'wi-snow-wind',
    'wi-snow',
    'wi-smog',
    'wi-smoke',
    'wi-lightning',
    'wi-raindrops',
    'wi-raindrop',
    'wi-dust',
    'wi-snowflake-cold',
    'wi-windy',
    'wi-strong-wind',
    'wi-sandstorm',
    'wi-earthquake',
    'wi-fire',
    'wi-flood',
    'wi-meteor',
    'wi-tsunami',
    'wi-volcano',
    'wi-hurricane',
    'wi-tornado',
    'wi-small-craft-advisory',
    'wi-gale-warning',
    'wi-storm-warning',
    'wi-hurricane-warning',
    'wi-wind-direction',
    'wi-alien',
    'wi-celsius',
    'wi-fahrenheit',
    'wi-degrees',
    'wi-thermometer',
    'wi-thermometer-exterior',
    'wi-thermometer-internal',
    'wi-cloud-down',
    'wi-cloud-up',
    'wi-cloud-refresh',
    'wi-horizon',
    'wi-horizon-alt',
    'wi-sunrise',
    'wi-sunset',
    'wi-moonrise',
    'wi-moonset',
    'wi-refresh',
    'wi-refresh-alt',
    'wi-umbrella',
    'wi-barometer',
    'wi-humidity',
    'wi-na',
    'wi-train',
    'wi-moon-new',
    'wi-moon-waxing-crescent-1',
    'wi-moon-waxing-crescent-2',
    'wi-moon-waxing-crescent-3',
    'wi-moon-waxing-crescent-4',
    'wi-moon-waxing-crescent-5',
    'wi-moon-waxing-crescent-6',
    'wi-moon-first-quarter',
    'wi-moon-waxing-gibbous-1',
    'wi-moon-waxing-gibbous-2',
    'wi-moon-waxing-gibbous-3',
    'wi-moon-waxing-gibbous-4',
    'wi-moon-waxing-gibbous-5',
    'wi-moon-waxing-gibbous-6',
    'wi-moon-full',
    'wi-moon-waning-gibbous-1',
    'wi-moon-waning-gibbous-2',
    'wi-moon-waning-gibbous-3',
    'wi-moon-waning-gibbous-4',
    'wi-moon-waning-gibbous-5',
    'wi-moon-waning-gibbous-6',
    'wi-moon-third-quarter',
    'wi-moon-waning-crescent-1',
    'wi-moon-waning-crescent-2',
    'wi-moon-waning-crescent-3',
    'wi-moon-waning-crescent-4',
    'wi-moon-waning-crescent-5',
    'wi-moon-waning-crescent-6',
    'wi-moon-alt-new',
    'wi-moon-alt-waxing-crescent-1',
    'wi-moon-alt-waxing-crescent-2',
    'wi-moon-alt-waxing-crescent-3',
    'wi-moon-alt-waxing-crescent-4',
    'wi-moon-alt-waxing-crescent-5',
    'wi-moon-alt-waxing-crescent-6',
    'wi-moon-alt-first-quarter',
    'wi-moon-alt-waxing-gibbous-1',
    'wi-moon-alt-waxing-gibbous-2',
    'wi-moon-alt-waxing-gibbous-3',
    'wi-moon-alt-waxing-gibbous-4',
    'wi-moon-alt-waxing-gibbous-5',
    'wi-moon-alt-waxing-gibbous-6',
    'wi-moon-alt-full',
    'wi-moon-alt-waning-gibbous-1',
    'wi-moon-alt-waning-gibbous-2',
    'wi-moon-alt-waning-gibbous-3',
    'wi-moon-alt-waning-gibbous-4',
    'wi-moon-alt-waning-gibbous-5',
    'wi-moon-alt-waning-gibbous-6',
    'wi-moon-alt-third-quarter',
    'wi-moon-alt-waning-crescent-1',
    'wi-moon-alt-waning-crescent-2',
    'wi-moon-alt-waning-crescent-3',
    'wi-moon-alt-waning-crescent-4',
    'wi-moon-alt-waning-crescent-5',
    'wi-moon-alt-waning-crescent-6',
    'wi-time-1',
    'wi-time-2',
    'wi-time-3',
    'wi-time-4',
    'wi-time-5',
    'wi-time-6',
    'wi-time-7',
    'wi-time-8',
    'wi-time-9',
    'wi-time-10',
    'wi-time-11',
    'wi-time-12',
    'wi-direction-up',
    'wi-direction-up-right',
    'wi-direction-right',
    'wi-direction-down-right',
    'wi-direction-down',
    'wi-direction-down-left',
    'wi-direction-left',
    'wi-direction-up-left',
    'towards-0-deg',
    'towards-23-deg',
    'towards-45-deg',
    'towards-68-deg',
    'towards-90-deg',
    'towards-113-deg',
    'towards-135-deg',
    'towards-158-deg',
    'towards-180-deg',
    'towards-203-deg',
    'towards-225-deg',
    'towards-248-deg',
    'towards-270-deg',
    'towards-293-deg',
    'towards-313-deg',
    'towards-336-deg',
    'from-180-deg',
    'from-203-deg',
    'from-225-deg',
    'from-248-deg',
    'from-270-deg',
    'from-293-deg',
    'from-313-deg',
    'from-336-deg',
    'from-0-deg',
    'from-23-deg',
    'from-45-deg',
    'from-68-deg',
    'from-90-deg',
    'from-113-deg',
    'from-135-deg',
    'from-158-deg',
    'wi-towards-n',
    'wi-towards-nne',
    'wi-towards-ne',
    'wi-towards-ene',
    'wi-towards-e',
    'wi-towards-ese',
    'wi-towards-se',
    'wi-towards-sse',
    'wi-towards-s',
    'wi-towards-ssw',
    'wi-towards-sw',
    'wi-towards-wsw',
    'wi-towards-w',
    'wi-towards-wnw',
    'wi-towards-nw',
    'wi-towards-nnw',
    'wi-from-n',
    'wi-from-nne',
    'wi-from-ne',
    'wi-from-ene',
    'wi-from-e',
    'wi-from-ese',
    'wi-from-se',
    'wi-from-sse',
    'wi-from-s',
    'wi-from-ssw',
    'wi-from-sw',
    'wi-from-wsw',
    'wi-from-w',
    'wi-from-wnw',
    'wi-from-nw',
    'wi-from-nnw',
    'wi-wind-beaufort-0',
    'wi-wind-beaufort-1',
    'wi-wind-beaufort-2',
    'wi-wind-beaufort-3',
    'wi-wind-beaufort-4',
    'wi-wind-beaufort-5',
    'wi-wind-beaufort-6',
    'wi-wind-beaufort-7',
    'wi-wind-beaufort-8',
    'wi-wind-beaufort-9',
    'wi-wind-beaufort-10',
    'wi-wind-beaufort-11',
    'wi-wind-beaufort-12'
  ];

  getIcons(): Array<string> {
    return this.icons;
  }

}
