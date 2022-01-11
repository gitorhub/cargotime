<!-- 
    target: o gün saat kaça kadar olan ürünler kargoda. Ör:15 ise, O gün saat 15 'e kadar olan ürünler için geri sayım yapılacak demektir.
    incarCago: 0 aynı gün kargoda demektir. 1 yarın, 2 ve üzeri ise 2 gün ve sonrası demektir. tarih yazar.

    hedef saatten gece 24'e kadar gün devam ettiğinden dolayı o alanların sağlıklı çalışabilmesi için aşağıdaki alanlar eklenmiştir. else ile başlayan aşağıdaki ifadeler 
    Heden saatten gece 12'ye kadar olan zamanları kapsamaktadır. 

    elseDay: saat 15ten sonra ise bir sonraki geri sayım hedefi günüdür. 1 ertesi gün demektir. 
    elseTarget: saat 15'ten sonra ise sonraki hedef saati belirtir. Yani elseDay 1 ve elseTarget:15 ise yarın 15'e kadar geri sayım olacak demektir.
    elseCargo: saat 15ten sonra ise sonraki Kargo teslim zamanını belirtir. 1 yarın demektir.  Yani elseDay 1 ve elseTarget:15 ise ve elseCargo 1 ise yarın 15'e kadar olan siparişlerde karkargo yarın demektir.




 -->


 ## X GÜNÜNE KADAR SİPARİŞ VERİRSENİZ, X GÜNÜN'DE KARGODA 