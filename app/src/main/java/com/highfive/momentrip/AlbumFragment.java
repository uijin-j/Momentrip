package com.highfive.momentrip;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

public class AlbumFragment extends Fragment implements JejuFragment.ClickPictureListener, RealPFragment.ClickPolaListener {
    /*필드 부분입니당^^*/
    // 프래그먼트 번호입니다^^(이게 왠지 태그인 것 같음)
    private final int fragmentM = 0;
    private final int fragmentJ = 1;
    private final int fragmentK = 2;
    private final int fragmentP = 3;
    private final int fragmentT = 4;
    private final int jeju_picture1 = 5;
    private final int realp_fragment = 6;

    // 버튼 클릭 횟수 알아보기
    int countJ = 1;
    int countK = 1;
    int countA = 1;
    int countP = 1;
    int countT = 1;

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);

    }

    @Override
    public void onDetach() {
        super.onDetach();
    }

    @Override
    /*메소드 부분입니당^^ */
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        ViewGroup rootView = (ViewGroup) inflater.inflate(R.layout.fragment_album, container, false);

        TextView jeju = (TextView) rootView.findViewById(R.id.jeju);
        TextView kang = (TextView) rootView.findViewById(R.id.kang);
        TextView alone = (TextView) rootView.findViewById(R.id.alone);
        TextView parent = (TextView) rootView.findViewById(R.id.parent);
        TextView today = (TextView) rootView.findViewById(R.id.today);

        // 기본화면 띄워두기
        FragmentView(fragmentM);

        // 제주 텍스트 클릭후 프래그먼트 전환 처리
        jeju.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(countJ != 0){
                    jeju.setSelected(true);
                    FragmentView(fragmentJ); // 제주 프래그먼트 출력
                    countJ= 0;
                }
                else{
                    jeju.setSelected(false);
                    FragmentView(fragmentM);
                    countJ = 1;
                }

            }
        });

        return rootView;
    }

    private void FragmentView(int fragment){
        //FragmentTransaction을 이용해 프래그먼트 사용
        // 프래그먼트 트랜잭션  선언 및 시작
//        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
//
//        switch(fragment){
//            case 0: //Main프래그먼트 출력
//                Fragment fragment1 = new MainFragment();
//                transaction.replace(R.id.p_container, fragment1); // 현 컨테이너 위치에 프래그먼트 입력
//
//                transaction.commit(); // 중요한 부분
//                break;
//
//            case 1: //Jeju프래그먼트 출력
//                Fragment fragment2 = new JejuFragment();
//                transaction.replace(R.id.p_container, fragment2); // 현 컨테이너 위치에 프래그먼트 입력
//
//                transaction.commit(); // 중요한 부분
//                break;
//
//            case 5: // Jeju의 picture 출력
//                Fragment fragment5 = new RealPFragment();
//                transaction.replace(R.id.p_container, fragment5);
//
//                transaction.commit();
//                break;
//        }

    }

    // 제주 인터페이스 구현 부분!
    @Override
    public void ClickPicture() {
        FragmentView(5);
    }

    // 사진첩 클릭시 인터페이스 구현 부분!
    @Override
    public void ClickPola(){
        Intent intent = new Intent(getActivity().getApplicationContext(), PolaActivity.class);
        startActivity(intent);

    }
}