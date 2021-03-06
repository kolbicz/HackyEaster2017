package ch.he17.epassclient;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;

import javax.smartcardio.CardException;
import javax.smartcardio.CardTerminal;

import org.jmrtd.PassportService;

import org.jmrtd.BACKey;
import org.jmrtd.lds.icao.DG2File;
import org.jmrtd.lds.icao.LDS;
import org.jmrtd.lds.iso19794.FaceImageInfo;
import org.jmrtd.lds.iso19794.FaceInfo;

import ch.he17.epassclient.terminal.HE17Terminal;
import net.sf.scuba.smartcards.CardFileInputStream;
import net.sf.scuba.smartcards.CardService;
import net.sf.scuba.smartcards.CardServiceException;

public class JMRTDMain {
	
	public static void main(String[] args) throws CardServiceException, CardException, IOException {
		CardTerminal cardTerminal = new HE17Terminal();
		CardService cService = CardService.getInstance(cardTerminal);
		PassportService passService = new PassportService(cService);
		cardTerminal.waitForCardPresent(1000);
//https://github.com/tananaev/passport-reader/blob/master/app/src/main/java/com/tananaev/passportreader/MainActivity.java
		passService.open();
		passService.sendSelectApplet(false);

        BACKey bacKey = new BACKey("P01234567", "770707", "210101");
		passService.doBAC(bacKey);
		DG2File dg2File; int bytesRead; LDS lds = new LDS();
		CardFileInputStream dg2In = passService.getInputStream(PassportService.EF_DG2);
		lds.add(PassportService.EF_DG2, dg2In, dg2In.getLength());
		dg2File = lds.getDG2File();
		List<FaceImageInfo> allFaceImageInfos = new ArrayList<>();
		List<FaceInfo> faceInfos = dg2File.getFaceInfos();
		for (FaceInfo faceInfo : faceInfos) {
		   allFaceImageInfos.addAll(faceInfo.getFaceImageInfos());}
		if (!allFaceImageInfos.isEmpty()) {
		   FaceImageInfo faceImageInfo = allFaceImageInfos.iterator().next();
		   int imageLength = faceImageInfo.getImageLength();
		   DataInputStream dataInputStream = new DataInputStream(faceImageInfo.getImageInputStream());
		   byte[] buffer = new byte[imageLength];
		   dataInputStream.readFully(buffer, 0, imageLength);
		   InputStream is = new ByteArrayInputStream(buffer, 0, imageLength);		 
		   OutputStream os = new FileOutputStream("C:\\Thumper.jpg");	   
		   byte[] photo = new byte[1024];
		   while(( bytesRead = is.read(photo)) !=-1){
		       os.write(photo, 0, bytesRead);}
		   is.close();os.flush();os.close();
		}
	}
}
