const weather = require('weather-js');

module.exports = {
    name: "weather",
    aliases: [],
    description:`Show The Weather At A Location You Desire`,
    usage: "(location)",

    async execute (client, message, args, Discord){

    weather.find({search: args.join(" "), degreeType: 'F'}, function (error, result){
        if(error) return message.channel.send(error);
        if(!args[0]) return message.channel.send('Please specify a location')

        if(result === undefined || result.length === 0) return message.channel.send('**Invalid** location');

        var current = result[0].current;
        var forecast = result[0].forecast;
        var location = result[0].location;

        const weatherinfo = new Discord.MessageEmbed()
        .setDescription(`**${current.skytext}**`)
        .setAuthor(`Weather forecast for ${current.observationpoint}`)
        .setThumbnail(current.imageUrl)
        .setColor(`${process.env.EMBEDCOLOR}`)
        .addField('Timezone', `UTC${location.timezone}`, true)
        .addField('Degree Type', 'Celsius', true)
        .addField('Temperature', `${current.temperature}°`, true)
        .addField('Wind', current.winddisplay, true)
        .addField('Feels like', `${current.feelslike}°`, true)
        .addField('Humidity', `${current.humidity}%`, true)


        message.channel.send(weatherinfo)
        })        
    }
}