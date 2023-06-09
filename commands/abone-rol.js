const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")

module.exports = {
  name: "abone-rol",
  description: "Abone rolü ayarlarsın.",
  type: 1,
  options: [
      {
      name:"ayarla",
      description:"Abone rolü seç.",
      type:8,
      required:true
}
  ],

  run: async(client, interaction) => {
let rol = await db.fetch(`abone_${interaction.guild.id}`);
      
      
     const yetkinyok = new EmbedBuilder()
      .setDescription("Bu komutu kullanmak için **Yönetici** yetkisine sahip olmalısın")
      .setColor("Red")
      
 if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({embeds: [yetkinyok], ephemeral: true})
      
      const abonerol = interaction.options.getRole("ayarla")
      
      const role = new EmbedBuilder()
    .setColor("Red")
    .setDescription(`Abone rolü zaten ayarlanmış.`)
      if(rol) return interaction.reply({embeds: [role], ephemeral: true})
     db.set(`abone_${interaction.guild.id}`, abonerol.id)
    
    const otorol = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`Abone rolü ${abonerol} olarak ayarlandı.`)
interaction.reply({embeds: [otorol]})

  }

};